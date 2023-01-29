<template>
  <div
    class="room-wrapper"
    :class="seatsAlignment"
  >
    <DeskGroup
      v-for="(oneGroupSeats, id) in oneRoomSeatGroups"
      :key="id"
      :seatGroup="oneGroupSeats"
    />
  </div>
</template>

<script>
import DeskGroupComponent from "@/components/Desk/DeskGroup.vue";
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
    currentRoomSide() {
      const oneRoomSeatGroups = getOneRoomSeatGroups(
        this.currentFloor,
        this.roomSide
      );
      return oneRoomSeatGroups[0][0].side;
    },
    seatsAlignment() {
      return this.currentRoomSide == "left"
        ? "seats-align--start"
        : "seats-align--end";
    },
  },
};
</script>

<style lang="scss" scoped>
.room-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
}
.seats-align--start {
  align-items: flex-start;
}
.seats-align--end {
  align-items: flex-end;
}
</style>