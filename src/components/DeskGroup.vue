<template>
  <div class="desk-group-container">
    <Desk
      v-for="seat in seatGroup"
      :key="seat.deskNr"
      :seat="seat"
    />
  </div>
</template>
  
<script>
import DeskComponent from "./Desk.vue";

export default {
  components: {
    Desk: DeskComponent,
  },
  props: ["seatGroup"],
};
</script>
  
<style lang="scss" scoped>
.desk-group-container {
  width: fit-content;

  display: grid;
  gap: 10px;
  align-content: center;
  justify-items: start;

  &:nth-child(-n + 4) {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
  }
  &:nth-child(n + 3) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
}
</style>