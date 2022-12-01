<template>
  <div>
    <!-- computed the currentFloor-seats to 6 groups: 6,6,6,6,4,4 -->
    <!-- create DeskGroup, style each Group independently  -->
    <!-- style the 6 groups  -->
    <Desk
      v-for="seat in currentFloor.seats"
      :key="seat.id"
    />
  </div>
</template>
  
  <script>
import DeskComponent from "./Desk.vue";

export default {
  components: {
    Desk: DeskComponent,
  },
  props: ["currentFloor"],
  data() {
    return {
      deskGroup: null,
      eachGroupCounts: [6, 6, 6, 6, 4, 4],
    };
  },
  computed: {
    seatGroups() {
      let seats = this.currentFloor.seats;
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
  
  <style>
</style>