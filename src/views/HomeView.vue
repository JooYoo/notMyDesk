<template>
  <v-card height="100%">
    <v-layout class="v-layout">
      <v-app-bar
        color="white"
        class="flex-grow-0"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title v-if="currentFloor">{{currentFloor.floorName}}</v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list-item class="nav-title-wrapper">
          <v-list-item-content v-if="currentFloor">
            <v-list-item-title class="text-h5 nav-title">{{currentFloor.floorName}}</v-list-item-title>
            <v-list-item-subtitle class="nav-subtitle">{{currentFloor.fullDate}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
          density="compact"
          nav
        >
          <v-list-item
            v-for="floor in selectDayfloors"
            :key="floor.id"
            @click="switchFloor(floor)"
            class="nav-list-item"
          >
            <template v-slot:prepend>
              <v-icon :icon="`mdi-numeric-${floor.id}-box-multiple-outline`"></v-icon>
            </template>
            <v-list-item-title
              class="nav-item-title"
              v-text="floor.floorName"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <div class="home-container">
          <!-- <SideNav>
            <SideNavItem
              v-for="floor in selectDayfloors"
              :key="floor.id"
              :floorInfo="floor"
              :selectedFloor="currentFloor"
              @click="switchFloor(floor)"
            />
          </SideNav> -->
          <div class="floor-container">
            <WeeklyDatePicker @selectedDate="getSelectedDateFloor" />
            <Floor :currentFloor="currentFloor" />
          </div>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { getFloorsBy } from "@/share/SeatManager";
import { getCurrentDate } from "@/share/DateManager";
import SideNavItemComponent from "@/components/SideNavItem.vue";
import SideNavComponent from "@/components/SideNav.vue";
import FloorComponent from "@/components/Floor.vue";
import WeeklyDatePickerComponent from "@/components/WeeklyDatePicker/WeeklyDatePicker.vue";
import { db } from "@/firebase/index";
import { collection, onSnapshot } from "firebase/firestore";
import {
  cleanUpWeeklyDateObjs,
  getWeeklyDateObjs,
  fbSaveData,
} from "@/firebase/FirestoreManager";
import { isObjEmpty } from "@/share/Util";
export default {
  name: "App",
  components: {
    SideNavItem: SideNavItemComponent,
    SideNav: SideNavComponent,
    Floor: FloorComponent,
    WeeklyDatePicker: WeeklyDatePickerComponent,
  },
  data() {
    return {
      // ui
      drawer: false,
      // data
      weeklyFloors: null,
      selectDayfloors: null,
      currentFloor: null,
    };
  },
  methods: {
    // switch floor and send selected-floor as current-floor
    switchFloor(floorInfo) {
      this.currentFloor = floorInfo;
      // set selected-floor-id in store
      this.setSelectedFloorId(floorInfo.id);
    },
    // get selected-date floors descending
    getSelectDayFloors(weeklyFloors, selectedDate) {
      // get selected-date floors
      let selectDayFloors = getFloorsBy(weeklyFloors, selectedDate);
      // sort floors descending
      let sortedFloors = selectDayFloors.sort((a, b) => (a.id < b.id ? 1 : -1));

      return sortedFloors;
    },
    // get selected-date from WeeklyDatePicker
    getSelectedDateFloor(theDate) {
      // based on selected-date to get that day floors
      this.selectDayfloors = this.getSelectDayFloors(
        this.weeklyFloors,
        theDate.fullDate
      );
      // get floorId
      const currentFloorId = this.currentFloor.id;
      // re-render current-floor
      this.currentFloor = this.selectDayfloors.find(
        (x) => x.id === currentFloorId
      );
    },
    // set selected-floor-id in store
    setSelectedFloorId(selectedFloorId) {
      this.$store.dispatch("setSelectedFloorId", selectedFloorId);
    },
  },
  async created() {
    // check Firestore data if data out of date
    await cleanUpWeeklyDateObjs();
  },
  mounted() {
    // listening Firestore data changes
    onSnapshot(collection(db, "weeklyDateObjs"), (querySnapshot) => {
      let fbWeeklyDateObjs = [];

      querySnapshot.forEach((doc) => {
        const newObj = {
          id: doc.id,
          fullDate: doc.data().fullDate,
          floors: doc.data().floors,
        };
        // load data from Firestore
        fbWeeklyDateObjs.push(newObj);
      });

      // if no data in DB then generate otherwise return
      this.weeklyFloors = getWeeklyDateObjs(fbWeeklyDateObjs);

      // default: get today date
      let todayFullDate = getCurrentDate().fullDate;

      // get selected-date floors descending
      this.selectDayfloors = this.getSelectDayFloors(
        this.weeklyFloors,
        todayFullDate
      );

      // default: active 3rd floor
      const selectedFloorId = this.$store.state.selectedFloorId;
      this.currentFloor = this.selectDayfloors.find(
        (x) => x.id === selectedFloorId
      );
    });
  },
};
</script>

<style lang="scss" scoped>
.nav-title {
  padding-top: 64px;
}
.nav-subtitle {
  padding-top: 12px;
  padding-bottom: 52px;
}

.nav-item-title {
  position: absolute;
  transform: translateY(-50%);
}

.v-layout {
  height: 100%;
}

.home-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.desk-container {
  padding: 24px;
}

.floor-container {
  width: 100%;
}
</style>
