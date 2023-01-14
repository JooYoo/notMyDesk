<template>
  <div class="weekly-date-picker-container">
    <!-- <div class="text-h5 curr-date-txt">{{currentDate.fullDate}}</div> -->
    <div class="picker-item-wrapper">
      <WeeklyDatePickerItem
        v-for="(weekDate, id) in weekDates"
        :key="id"
        :weekDate="weekDate"
        :selectedDay="currentDate"
        @click="switchDay(weekDate)"
        class="picker-item"
      />
    </div>
  </div>
</template>

<script>
import { getWeekDates, getCurrentDate } from "@/share/DateManager";
import WeeklyDatePickerItemCompoent from "./WeeklyDatePickerItem.vue";

export default {
  components: {
    WeeklyDatePickerItem: WeeklyDatePickerItemCompoent,
  },
  data() {
    return {
      currentDate: null,
    };
  },
  computed: {
    weekDates() {
      return getWeekDates();
    },
  },
  methods: {
    switchDay(dayInfo) {
      this.currentDate = dayInfo;
      // emit selected-date to HomeView
      this.$emit("selectedDate", dayInfo);
    },
  },

  created() {
    this.currentDate = getCurrentDate();
  },
};
</script>

<style lang="scss" scoped>
.weekly-date-picker-container {
  position: relative;
  z-index: 1;
  padding: 32px 40px;
  background-color: rgba(249, 249, 249);

  .picker-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .curr-date-txt {
    text-align: start;
  }
}

@media (max-width: 600px) {
  .weekly-date-picker-container {
    padding: 8px 8px;

    .picker-item {
      transform: scale(0.85);
    }
  }
}
</style>