<template>
  <!-- <v-tabs fixed-tabs>
    <v-tab>
      L E F T
    </v-tab>
    <v-tab>
      R I G H T
    </v-tab>
  </v-tabs> -->
  <div
    v-if="isCurrentFloorExist"
    class="floor-container"
    :class="moveFloorClass"
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

const floorGo = Object.freeze({
  up: "up",
  down: "down",
});

export default {
  components: {
    DeskGroup: DeskGroupComponent,
    WeeklyDatePicker: WeeklyDatePickerComponent,
    Room: RoomComponent,
  },
  data() {
    return {
      moveFloorClass: "",
    };
  },
  props: ["currentFloor"],
  watch: {
    // watch switch floor state
    currentFloor(newVal, oldVal) {
      if (oldVal && newVal) {
        // check move-direction
        this.checkDirection(oldVal.id, newVal.id);
      }
    },
  },
  methods: {
    checkDirection(oldId, newId) {
      // set direct based on old-floor-id and new-floor-id
      if (oldId < newId) {
        this.moveFloorClass = "goup";
      } else if (oldId > newId) {
        this.moveFloorClass = "godown";
      }
      // reset move-floor-class
      setTimeout(() => {
        this.moveFloorClass = "";
      }, 600);
    },
  },
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
}

// switch floor animation
.goup {
  animation-name: goup;
  animation-duration: 0.5s;
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

.godown {
  animation-name: godown;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
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