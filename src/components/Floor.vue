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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20%;
  padding: 40px;
  padding-top: unset;
  width: 100%;
  height: 100%;

  // TODO: wrap animation properties to new class
  animation-name: goup;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes goup {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  25% {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
  50% {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  75% {
    transform: translate3d(0, 0%, 0);
    opacity: 1;
  }
}

@keyframes godown {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  25% {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  50% {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
  75% {
    transform: translate3d(0, 0%, 0);
    opacity: 1;
  }
}
</style>