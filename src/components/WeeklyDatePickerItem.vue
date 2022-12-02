<template>
  <div class="picker-item-container">
    <div class="week-day">{{weekDay}}</div>
    <div class="month-day">{{monthDay}}</div>
  </div>
</template>

<script>
export default {
  props: ["weekDay", "monthDay"],
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

  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>