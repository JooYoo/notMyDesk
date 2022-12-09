<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        > {{seat.deskNr}} {{seat.occupied}} </v-btn>
      </template>

      <v-card>
        <v-card-item>
          <v-card-title>{{seat.occupied}}</v-card-title>
          <v-card-subtitle>
            <span class="mr-1">{{seat.date}}</span>
            <v-icon
              color="error"
              icon="mdi-fire-circle"
              size="small"
            ></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-text-field
            v-model="occupiedBy"
            clearable
            label="take the seat by typing your name"
            variant="outlined"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="saveAndClose()"
          >
            Save Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { getFloorBy, setOccupyToSeatBy } from "@/share/SeatManager";

export default {
  props: ["seat"],
  data() {
    return {
      dialog: false,
      occupiedBy: "",
    };
  },
  computed: {
    // if seat-occupied is null => Empty
    // if seat-occupied is 'Tom' => ocuppiedBy = 'Tom'
  },
  methods: {
    saveAndClose() {
      // vuetify close popup
      this.dialog = false;

      // TODO: set data to store

      // get selected-seat
      let selectedSeat = this.seat;
      console.log(selectedSeat);

      // get store-data-weeklyFloors
      let weeklyFloors = this.$store.state.weeklyFloors;
      console.log(weeklyFloors);

      // get target-floor
      let floor = getFloorBy(
        weeklyFloors,
        selectedSeat.floorId,
        selectedSeat.fullDate
      );
      console.log(floor);

      // set occupy to target-seat
      setOccupyToSeatBy(floor, selectedSeat, this.occupiedBy);
      console.log(this.$store.state.weeklyFloors);

      // TODO: notify FloorView weeklyFloors changed
    },
  },
};
</script>
  
  <style>
</style>