import { createStore } from "vuex";
import { loadWeeklyDateObjs } from "@/firebase/FirestoreManager";

const store = createStore({
    state: {
        // get data from Firestore otherwise generate
        weeklyFloors: await loadWeeklyDateObjs(),
        // selected-floor-id
        selectedFloorId: 3
    },
    mutations: {
        // set selected-floor-id
        setSelectedFloorId(state, payload) {
            state.selectedFloorId = payload
        }
    },
    actions: {
        setSelectedFloorId(context, payload) {
            context.commit("setSelectedFloorId", payload)
        }
    }
});

export default store