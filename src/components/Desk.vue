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
        > {{seat.deskNr}}. {{seat.occupiedBy}} </v-btn>
      </template>

      <v-card>
        <v-card-item>
          <v-card-title>{{occupiedBy}}</v-card-title>
          <v-card-subtitle>
            <span class="mr-1">{{seat.fullDate}}</span>
            <!-- TODO:  change icon and color based on occupy-->
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
import { getFloorBy, setOccupyToStore } from "@/share/SeatManager";
import { saveData } from "@/share/LocalStorageManager";

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
      // set data to store
      this.setNewOccupy(this.seat);
    },
    setNewOccupy(selectedSeat) {
      // get store-data-weeklyFloors
      let weeklyFloors = this.$store.state.weeklyFloors;
      // get target-floor
      let floor = getFloorBy(
        weeklyFloors,
        selectedSeat.floorId,
        selectedSeat.fullDate
      );
      // set occupy to target-seat
      setOccupyToStore(floor, selectedSeat, this.occupiedBy);
      // TODO: save new-weeklyFloors to LocalStorage
      saveData(weeklyFloors);
    },
  },
};
</script>
  
  <style>
</style>