import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/index";

// firestore - load data from Firestore
async function loadDbData() {
    let weeklyDateObjs = null
    // TODO: if data is out of date then clean up localStorage

    // try to load  data from firestore
    const querySnapshot = await getDocs(collection(db, "weeklyDateObjs"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    // TODO: if no data in DB then generate
}

export {
    loadDbData
}