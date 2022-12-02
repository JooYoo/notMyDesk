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
            clearable
            label="take the seat by typing your name"
            variant="outlined"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="dialog = false"
          >
            Save Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: ["seat"],
};
</script>
  
  <style>
</style>