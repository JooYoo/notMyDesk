<template>
  <div
    v-if="isCurrentFloorExist"
    class="floor-container"
  >
    <Room
      :currentFloor="currentFloor"
      :roomSide="'left'"
    />
    <Room
      :currentFloor="currentFloor"
      :roomSide="'right'"
    />
    <!-- <div
      v-if="isCurrentFloorExist"
      class="desk-groups-wrapper"
    >
    </div> -->
  </div>
</template>
  
<script>
import WeeklyDatePickerComponent from "./WeeklyDatePicker.vue";
import DeskGroupComponent from "./DeskGroup.vue";
import RoomComponent from "./Room.vue";

export default {
  components: {
    DeskGroup: DeskGroupComponent,
    WeeklyDatePicker: WeeklyDatePickerComponent,
    Room: RoomComponent,
  },
  props: ["currentFloor"],
  computed: {
    // prevent component rendering too fast
    isCurrentFloorExist() {
      return this.currentFloor;
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