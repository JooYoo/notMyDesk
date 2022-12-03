<template>
  <div class="weekly-date-picker-container">
    <div class="text-h5 curr-date-txt">{{currentDate.fullDate}}</div>
    <div class="picker-item-wrapper">
      <WeeklyDatePickerItem
        v-for="(weekDate, id) in weekDates"
        :key="id"
        :weekDate="weekDate"
        :selectedDay="currentDate"
        @click="switchDay(weekDate)"
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
    },
  },

  created() {
    this.currentDate = getCurrentDate();
  },
};
</script>

<style lang="scss" scoped>
.weekly-date-picker-container {
  padding: 20px 40px;

  .picker-item-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .curr-date-txt {
    text-align: start;
  }
}
</style>