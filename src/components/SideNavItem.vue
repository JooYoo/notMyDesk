<template>
  <div :class="['container', state]">
    <div>{{ floorInfo.floorName }}</div>
  </div>
</template>
  
  <script>
export default {
  props: ["floorInfo", "selectedFloor"],
  data() {
    return {
      state: "container--unselected",
    };
  },
  watch: {
    // change background-color when visited
    selectedFloor(newVal, oldVal) {
      if (this.floorInfo.id === newVal.id) {
        this.state = "container--selected";
      } else {
        this.state = "container--unselected";
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 8px;
  border-bottom: 2px solid gray;
  cursor: pointer;

  &:hover {
    // background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
  }

  &--unselected {
    background-color: unset;
  }

  &--selected {
    background-color: black;
    color: whitesmoke;
  }
}
</style>