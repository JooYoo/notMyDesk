<template>
  <div class="weekly-date-picker-container">
    <div class="text-h5 curr-date-txt">DatePicker</div>
    <div class="picker-item-wrapper">
      <WeeklyDatePickerItem
        v-for="(dayInfo, id) in weekDayInfos"
        :key="id"
        :weekDay="dayInfo.weekDay"
        :monthDay="dayInfo.day"
      />
    </div>
  </div>
</template>

<script>
import { getWeekDays } from "@/share/DateManager";
import WeeklyDatePickerItemCompoent from "./WeeklyDatePickerItem.vue";

export default {
  components: {
    WeeklyDatePickerItem: WeeklyDatePickerItemCompoent,
  },
  data() {
    return {};
  },
  computed: {
    weekDayInfos() {
      return getWeekDays();
    },
  },
  mounted() {
    console.log(getWeekDays());
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