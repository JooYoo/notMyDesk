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
import { loadWeeklyDateObjs } from "@/firebase/FirestoreManager";
import SideNavItemComponent from "@/components/SideNavItem.vue";
import SideNavComponent from "@/components/SideNav.vue";
import FloorComponent from "@/components/Floor.vue";
import WeeklyDatePickerComponent from "@/components/WeeklyDatePicker.vue";
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
  // TODO: for testing, delete when Firestore works
  async mounted() {
    await loadWeeklyDateObjs();
  },
  created() {
    // load data from store
    this.weeklyFloors = this.$store.state.weeklyFloors;

    // default: get today date
    let todayFullDate = getCurrentDate().fullDate;

    // get selected-date floors descending
    this.selectDayfloors = this.getSelectDayFloors(
      this.weeklyFloors,
      todayFullDate
    );

    // default: active 3rd floor
    this.currentFloor = this.selectDayfloors.filter((x) => x.id === 3)[0];
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
