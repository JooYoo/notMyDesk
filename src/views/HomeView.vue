<template>
  <div class="container">
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
import { getFloorsBy, generateWeeklyEmptyFloorsBy } from "@/share/SeatManager";
import { getCurrentDate } from "@/share/DateManager";
import { loadData } from "@/share/LocalStorageManager";
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
    // TODO: remove when new data-structure works
    // get selected-date floors descending
    getSelectDayFloors(weeklyFloors, selectedDate) {
      // get selected-date floors
      let selectDayFloors = getFloorsBy(weeklyFloors, selectedDate);
      console.log(selectDayFloors);
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
  created() {
    // load data from store
    // TODO: uncomment after new data-structure is conformed
    this.weeklyFloors = this.$store.state.weeklyFloors;
    // this.weeklyFloors = generateWeeklyEmptyFloorsBy([3, 4, 5]);
    console.log(this.weeklyFloors);

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

<style>
.container {
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
