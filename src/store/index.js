import { createStore } from "vuex";
import { loadData } from "@/share/LocalStorageManager";
import { loadWeeklyDateObjs } from "@/firebase/FirestoreManager";

const store = createStore({
    state: {
        // get data from LocalStorage otherwise generate
        // weeklyFloors: loadData()
        // TODO: Try to get data from Firestore
        // get data from Firestore otherwise generate
        weeklyFloors: await loadWeeklyDateObjs()
    }
});

export default store