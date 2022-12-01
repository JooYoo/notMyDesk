<template>
  <div class="container">
    <Desk
      v-for="seat in seatGroup"
      :key="seat.id"
    />
  </div>
</template>
  
  <script>
import DeskComponent from "./Desk.vue";
export default {
  components: {
    Desk: DeskComponent,
  },
  porps: ["seatGroup"],
};
</script>
  
  <style>
</style>