<template>
  <div :class="['picker-item-container', state]">
    <div class="week-day">{{weekDate.weekDay}}</div>
    <div class="month-day">{{weekDate.monthDay}}</div>
    <div>{{weekDate.monthName}}</div>
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
      this.setState(newVal);
    },
  },
  methods: {
    setState(prop) {
      if (this.weekDate.fullDate === prop.fullDate) {
        this.state = "picker-item-container--selected";
      } else {
        this.state = "picker-item-container--unselected";
      }
    },
  },
  mounted() {
    this.setState(this.selectedDay);
  },
};
</script>

<style lang="scss" scoped>
.picker-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 4px;
  width: 72px;
  border-radius: 0.8em;

  .month-day {
    font-size: 24px;
    font-weight: bold;
    color: black;
  }

  &:hover {
    background-color: black;
    color: whitesmoke;

    .month-day {
      color: whitesmoke;
    }
  }

  &--unselected {
    background-color: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.5);
  }

  &--selected {
    background-color: black;
    color: whitesmoke;

    .month-day {
      color: whitesmoke;
    }
  }

  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>