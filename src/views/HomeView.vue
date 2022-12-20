<template>
  <div class="home-container">
    <SideNav>
      <SideNavItem
        v-for="floor in selectDayfloors"
        :key="floor.id"
        :floorInfo="floor"
        :selectedFloor="currentFloor"
        @click="switchFloor(floor)"
      />
    </SideNav>

    <div class="floor-container">
      <WeeklyDatePicker @selectedDate="getSelectedDateFloor" />
      <Floor :currentFloor="currentFloor" />
    </div>
  </div>
</template>

<script>
import { getFloorsBy } from "@/share/SeatManager";
import { getCurrentDate } from "@/share/DateManager";
import SideNavItemComponent from "@/components/SideNavItem.vue";
import SideNavComponent from "@/components/SideNav.vue";
import FloorComponent from "@/components/Floor.vue";
import WeeklyDatePickerComponent from "@/components/WeeklyDatePicker.vue";
import { db } from "@/firebase/index";
import { collection, onSnapshot } from "firebase/firestore";
import { cleanUpWeeklyDateObjs, fbSaveData } from "@/firebase/FirestoreManager";
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
      weeklyFloors: null,
      selectDayfloors: null,
      currentFloor: null,
    };
  },
  methods: {
    // switch floor and send selected-floor as current-floor
    switchFloor(floorInfo) {
      this.currentFloor = floorInfo;
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
  },
  async created() {
    // TODO: check if new week comes the data should be updated
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

      // if no data in DB then generate
      // TODO: can be refactored
      if (isObjEmpty(fbWeeklyDateObjs)) {
        this.weeklyFloors = generateWeeklyEmptyFloorsBy([3, 4, 5]);
        // save new generated data to firestore
        fbSaveData(fbWeeklyDateObjs);
      } else {
        // if data exists then get data from LocalStorage
        this.weeklyFloors = fbWeeklyDateObjs;
      }

      // default: get today date
      let todayFullDate = getCurrentDate().fullDate;

      // get selected-date floors descending
      this.selectDayfloors = this.getSelectDayFloors(
        this.weeklyFloors,
        todayFullDate
      );

      // default: active 3rd floor
      this.currentFloor = this.selectDayfloors.filter((x) => x.id === 3)[0];
    });
  },
};
</script>

<style lang="scss" scoped>
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
