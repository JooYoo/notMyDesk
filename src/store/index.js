import { createStore } from "vuex";
import { loadWeeklyDateObjs } from "@/firebase/FirestoreManager";

const store = createStore({
    state: {
        // get data from Firestore otherwise generate
        weeklyFloors: await loadWeeklyDateObjs()
    }
});

export default store