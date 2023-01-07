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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
  padding: 40px;
  padding-top: unset;
  width: 100%;
  height: 70%;
}
</style>