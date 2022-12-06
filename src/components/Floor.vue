<template>
  <div class="floor-container">
    <WeeklyDatePicker @selectedDate="getSelectedDate" />
    <div class="desk-groups-wrapper">
      <DeskGroup
        v-for="(group, id) in seatGroups"
        :key="id"
        :seatGroup="group"
      />
    </div>
  </div>
</template>
  
<script>
import { gatherGroups } from "@/share/SeatManager";
import WeeklyDatePickerComponent from "./WeeklyDatePicker.vue";
import DeskGroupComponent from "./DeskGroup.vue";

export default {
  components: {
    DeskGroup: DeskGroupComponent,
    WeeklyDatePicker: WeeklyDatePickerComponent,
  },
  props: ["currentFloor"],
  data() {
    return {
      eachGroupCounts: [6, 6, 6, 6, 4, 4],
      seatGroups: null,
    };
  },
  watch: {
    currentFloor(newVal, oldVal) {
      this.getSeatGroups(newVal);
    },
  },
  methods: {
    getSeatGroups(selectedFloor) {
      let seats = selectedFloor.seats;

      if (!seats) {
        return [];
      }

      this.seatGroups = gatherGroups(seats, this.eachGroupCounts);
    },
    // pass selected-date from WeeklyDatePicker to HomeView
    getSelectedDate(theDate) {
      this.$emit("selectedDate", theDate);
    },
  },
  mounted() {
    this.getSeatGroups(this.currentFloor[0]);
  },
};
</script>
  
<style lang="scss" scoped>
.floor-container {
  width: 100%;
}

.desk-groups-wrapper {
  padding: 40px;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  align-content: center;
  justify-content: space-evenly;
  gap: 40px;
}
</style>