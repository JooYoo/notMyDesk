import { createStore } from "vuex";
import { loadData } from "@/share/LocalStorageManager";

const store = createStore({
    state: {
        // get data from LocalStorage otherwise generate
        weeklyFloors: loadData()
    }
});

export default store