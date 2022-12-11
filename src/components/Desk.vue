<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          :color="deskColor(seat.floorId)"
          v-bind="props"
        > {{seat.deskNr}}. {{seat.occupiedBy}} </v-btn>
      </template>

      <v-card>
        <v-card-item>
          <v-card-title>{{deskModalTitle(seat, occupiedBy)}}</v-card-title>
          <v-card-subtitle>
            <span class="mr-1">{{seat.fullDate}}</span>
            <v-icon
              :color="deskModalIconColor(seat.occupiedBy)"
              :icon="deskModalIcon(seat.occupiedBy)"
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
    // display desk-modal-title
    deskModalTitle() {
      return (seat, vModelText) => {
        let displayText = "";
        if (vModelText) {
          displayText = vModelText;
        } else if (seat.occupiedBy) {
          displayText = seat.occupiedBy;
        } else {
          displayText = "Empty";
        }
        return displayText;
      };
    },
    // change icon based on
    deskModalIcon() {
      return (occupiedBy) => {
        let icon = "";
        if (occupiedBy) {
          icon = "mdi-stop-circle";
        } else {
          icon = "mdi-play-circle";
        }
        return icon;
      };
    },
    deskModalIconColor() {
      return (occupiedBy) => {
        let color = "";
        if (occupiedBy) {
          color = "red";
        } else {
          color = "green";
        }
        return color;
      };
    },
    // change desk-color based on floorId
    deskColor() {
      return function (floorId) {
        let deskColor = "";
        switch (floorId) {
          case 3:
            deskColor = "indigo darken-1";
            break;
          case 4:
            deskColor = "teal darken-1";
            break;
          case 5:
            deskColor = "purple darken-1";
            break;
          default:
            break;
        }
        return deskColor;
      };
    },
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
      // save new-weeklyFloors to LocalStorage
      saveData(weeklyFloors);
    },
  },
};
</script>
  
  <style>
</style>