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

    <Floor
      :currentFloor="currentFloor"
      @selectedDate="getSelectedDate"
    />
  </div>
</template>

<script>
import { initWeeklyEmptyFloorsBy, getFloorsBy } from "@/share/SeatManager";
import { getCurrentDate } from "@/share/DateManager";
import { loadData } from "@/share/LocalStorageManager";
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
    // get selected-date from FloorView
    getSelectedDate(theDate) {
      // based on selected-date to load corresponding day floors from weeklyFloors
      this.selectDayfloors = this.getSelectDayFloors(
        this.weeklyFloors,
        theDate.fullDate
      );
    },
  },
  created() {
    // TODO: storage - if storage exists then delete old one

    // load data from LocalStorage otherwise generate
    this.weeklyFloors = loadData();

    // default: get today date
    let todayFullDate = getCurrentDate().fullDate;

    // get selected-date floors descending
    this.selectDayfloors = this.getSelectDayFloors(
      this.weeklyFloors,
      todayFullDate
    );

    // default: active 3rd floor
    this.currentFloor = this.selectDayfloors.filter((x) => x.id === 3);
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
