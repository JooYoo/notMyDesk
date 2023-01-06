<template>
  <div class="rooms-wrapper">
    <DeskGroup
      v-for="(oneGroupSeats, id) in oneRoomSeatGroups"
      :key="id"
      :seatGroup="oneGroupSeats"
    />
  </div>
</template>

<script>
import DeskGroupComponent from "./DeskGroup.vue";
import { getOneRoomSeatGroups } from "@/share/SeatManager";

export default {
  components: {
    DeskGroup: DeskGroupComponent,
  },
  props: ["currentFloor", "roomSide"],
  computed: {
    oneRoomSeatGroups() {
      return getOneRoomSeatGroups(this.currentFloor, this.roomSide);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>