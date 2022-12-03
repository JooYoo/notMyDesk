<template>
  <div :class="['picker-item-container', state]">
    <div class="week-day">{{weekDate.weekDay}}</div>
    <div class="month-day">{{weekDate.monthDay}}</div>
  </div>
</template>

<script>
export default {
  props: ["weekDate", "selectedDay"],
  data() {
    return {
      state: "picker-item-container--unselected",
    };
  },
  watch: {
    selectedDay(newVal, oldVal) {
      if (this.weekDate.fullDate === newVal.fullDate) {
        this.state = "picker-item-container--selected";
      } else {
        this.state = "picker-item-container--unselected";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.picker-item-container {
  margin-top: 16px;
  padding: 28px 4px;
  width: 72px;
  height: 110px;
  border-radius: 6em;

  &:hover {
    background-color: black;
    color: whitesmoke;
  }

  &--unselected {
    background-color: unset;
    color: rgba(0, 0, 0, 0.5);
  }

  &--selected {
    background-color: black;
    color: whitesmoke;
  }

  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>