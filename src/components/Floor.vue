<template>
  <div class="floor-container">
    <!-- <h1>nihao</h1> -->
    <WeeklyDatePicker />
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
    };
  },
  computed: {
    seatGroups() {
      let seats = this.currentFloor.seats;

      if (!seats) {
        return [];
      }

      console.log(this.gatherGroups(seats, this.eachGroupCounts));

      return this.gatherGroups(seats, this.eachGroupCounts);
    },
  },
  methods: {
    gatherGroups(seats, eachGroupCounts) {
      let groups = [];
      let eachGroup = eachGroupCounts;
      let index = 0;

      // iterate eachGroup
      for (let i = 0; i < eachGroup.length; i++) {
        // get current count
        const currCount = eachGroup[i];

        // group seats by eachGroup
        const newGroup = [];
        for (let j = 0; j < currCount; j++) {
          // if the seat not exist, break
          if (!seats[index]) {
            groups.push(newGroup);
            return groups;
          }

          // push the seat to newGroup
          const seat = seats[index];
          newGroup.push(seat);
          index++;
        }

        // add group to result
        groups.push(newGroup);
      }

      return groups;
    },
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