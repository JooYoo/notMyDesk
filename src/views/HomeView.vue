<template>
  <div class="container">
    <SideNav>
      <SideNavItem
        v-for="floor in sortedFloors"
        :key="floor.id"
        :floorInfo="floor"
        :selectedFloor="currentFloor"
        @click="switchFloor(floor)"
      />
    </SideNav>
    <div class="desk-container">
      <Floor :currentFloor="currentFloor" />
    </div>
  </div>
</template>

<script>
import JsonFloor from "@/data/floor.json";

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
      floors: JsonFloor,
      currentFloor: null,
    };
  },
  computed: {
    // sort the floor descending
    sortedFloors() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.floors.sort((a, b) => (a.id < b.id ? 1 : -1));
    },
  },
  methods: {
    switchFloor(floorInfo) {
      let currentFloor = floorInfo;
      this.currentFloor = currentFloor;
    },
  },
  created() {
    // active 3rd floor as default
    this.currentFloor = this.floors.filter((x) => x.id === 3);
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;

  height: 100%;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
} */

.container {
  display: flex;
  height: 100%;
  width: 100%;
}

.desk-container {
  padding: 24px;
}
</style>
