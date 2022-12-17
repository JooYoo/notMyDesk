import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/index";
import { generateWeeklyEmptyFloorsBy } from "@/share/SeatManager";
import { isWeeklyFloorOutOfDate } from "@/share/DateManager";
import { isObjEmpty } from "@/share/Util";

// firebase - load data (real-time) from Firestore
function fbRealTimeLoadData() {
    // create a promise 
    return new Promise((resolve, reject) => {
        // listen to docs from Firestore
        onSnapshot(collection(db, 'weeklyDateObjs'), (querySnapshot) => {
            let fbWeeklyDateObjs = null

            querySnapshot.forEach((doc) => {
                fbWeeklyDateObjs = doc.data()
            });

            // output the data from Firestore
            resolve(fbWeeklyDateObjs)
        })
    })
}

// firebase - save data into Firestore
function fbSaveData(weeklyDateObjs) {
    // iterate generated-weekly-objs
    weeklyDateObjs.forEach(obj => {
        // save objs one by one ( 7 in total)
        addDoc(collection(db, 'weeklyDateObjs'), {
            fullDate: obj.fullDate,
            floors: obj.floors
        })
    })
}

// firebase - load data from Firestore
async function fbLoadData() {
    let fbWeeklyDateObjs = []

    // firestore - get querySnapshop (collection) from Firebase
    const querySnapshot = await getDocs(collection(db, "weeklyDateObjs"));
    // firestore - iterate docs in collection
    querySnapshot.forEach((doc) => {
        const newObj = {
            id: doc.id,
            fullDate: doc.data().fullDate,
            floors: doc.data().floors
        }
        fbWeeklyDateObjs.push(newObj)
    });

    return fbWeeklyDateObjs
}

// firebase - delete documents in Firestore
function fbDeleteObjs(fbWeeklyDateObjs) {
    fbWeeklyDateObjs.forEach(obj => {
        deleteDoc(doc(collection(db, "weeklyDateObjs"), obj.id))
    })
}

// db - clean data logic
async function cleanUpWeeklyDateObjs() {
    // get data from Firebase
    const fbWeeklyDateObjs = await fbLoadData()

    // if data exists then start clean-up-process
    if (!isObjEmpty(fbWeeklyDateObjs)) {
        // check if dates out of date
        let shouldCleanStorage = isWeeklyFloorOutOfDate(fbWeeklyDateObjs)
        // FIXME: delete next week
        console.log(shouldCleanStorage);
        // clean up db docs
        if (shouldCleanStorage) {
            fbDeleteObjs(fbWeeklyDateObjs)
            console.log("deleteStorage");
        }
    }
}

// db - load data logic
async function loadWeeklyDateObjs() {
    let weeklyDateObjs = null

    // if data is out of date then clean up localStorage
    await cleanUpWeeklyDateObjs()

    // try to load data from firestore
    const fbWeeklyDateObjs = await fbLoadData()

    // if no data in DB then generate
    if (isObjEmpty(fbWeeklyDateObjs)) {
        weeklyDateObjs = generateWeeklyEmptyFloorsBy([3, 4, 5])
        // save new generated data to firestore
        fbSaveData(weeklyDateObjs)
    } else {
        // if data exists then get data from LocalStorage
        weeklyDateObjs = fbWeeklyDateObjs
    }

    return weeklyDateObjs
}

export {
    loadWeeklyDateObjs
}