<template>
  <div
    v-if="isCurrentFloorExist"
    class="floor-tab-view"
  >
    <v-tabs
      v-model="tab"
      fixed-tabs
      class="floor-tab-view__tabs"
    >
      <v-tab value="left">
        L E F T
      </v-tab>
      <v-tab value="right">
        R I G H T
      </v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      class="tab-window"
      :class="moveFloorClass"
    >
      <v-window-item
        value="left"
        class="tab-room-wrapper"
      >
        <Room
          :currentFloor="currentFloor"
          :roomSide="'left'"
        />
      </v-window-item>
      <v-window-item
        value="right"
        class="tab-room-wrapper"
      >
        <Room
          :currentFloor="currentFloor"
          :roomSide="'right'"
        />
      </v-window-item>
    </v-window>
  </div>

  <div
    v-if="isCurrentFloorExist"
    class="floor-full-view"
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
import WeeklyDatePickerComponent from "./WeeklyDatePicker/WeeklyDatePicker.vue";
import DeskGroupComponent from "./Desk/DeskGroup.vue";
import RoomComponent from "./Room.vue";

export default {
  components: {
    DeskGroup: DeskGroupComponent,
    WeeklyDatePicker: WeeklyDatePickerComponent,
    Room: RoomComponent,
  },
  data() {
    return {
      moveFloorClass: "",
      tab: null,
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
.floor-full-view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20%;
  padding: 40px;
  padding-top: unset;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 249, 249);
}

// tab content
.floor-tab-view {
  display: none;
  height: 100%;

  &__tabs {
    position: relative;
    background-color: rgba(249, 249, 249);
    z-index: 1;
  }

  .tab-window {
    height: 100%;
    .tab-room-wrapper {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      background-color: rgba(249, 249, 249);
    }
  }
}

// responsive
@media (max-width: 600px) {
  .floor-full-view {
    display: none;
  }
  .floor-tab-view {
    display: unset;
  }
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