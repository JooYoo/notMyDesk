import { createStore } from "vuex";
import { loadData } from "@/share/LocalStorageManager";
import { generateWeeklyEmptyFloorsBy } from "@/share/SeatManager";

const store = createStore({
    state: {
        // get data from LocalStorage otherwise generate
        weeklyFloors: loadData()
    }
});

export default store