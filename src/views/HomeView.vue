<template>
  <div class="container">
    <SideNav>
      <SideNavItem
        v-for="floor in floors"
        :key="floor.id"
        :floorInfo="floor"
        :selectedFloor="currentFloor"
        @click="switchFloor(floor)"
      />
    </SideNav>

    <Floor
      :currentFloor="currentFloor"
      @selectedDate="getSelectedDate"
    />
  </div>
</template>

<script>
import JsonFloors from "@/data/floors.json";
import { initWeeklyEmptyFloorsBy, getFloorsBy } from "@/share/SeatManager";
import { getCurrentDate } from "@/share/DateManager";
import SideNavItemComponent from "@/components/SideNavItem.vue";
import SideNavComponent from "@/components/SideNav.vue";
import FloorComponent from "@/components/Floor.vue";
export default {
  name: "App",
  components: {
    SideNavItem: SideNavItemComponent,
    SideNav: SideNavComponent,
    Floor: FloorComponent,
  },
  data() {
    return {
      floors: JsonFloors,
      currentFloor: null,
    };
  },
  methods: {
    switchFloor(floorInfo) {
      this.currentFloor = floorInfo;
    },
    getSortedFloors(theDayFloors) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return theDayFloors.sort((a, b) => (a.id < b.id ? 1 : -1));
    },
    // get selected-date from Floor
    getSelectedDate(theDate) {
      console.log(`📆 ${theDate.fullDate}`);
      // TODO: based on selected-date to load corresponding floors
    },
  },
  created() {
    // create this week floors based on floor index
    let weeklyFloors = initWeeklyEmptyFloorsBy([3, 4, 5]);

    // get current day floors
    let todayFullDate = getCurrentDate().fullDate;
    let todayFloors = getFloorsBy(weeklyFloors, todayFullDate);

    // sort floors descending
    let sortedFloors = this.getSortedFloors(todayFloors);
    this.floors = sortedFloors;

    // active 3rd floor as default
    this.currentFloor = sortedFloors.filter((x) => x.id === 3);
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
</style>
