<template>
  <div class="container">
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
  
<style>
</style>