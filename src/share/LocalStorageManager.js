import { initWeeklyEmptyFloorsBy } from "@/share/SeatManager";

// load data from LocalStorage
function loadData() {
    let weeklyFloors = null
    const storageWeeklyFloors = localStorage.getItem("weeklyFloors")
    if (!storageWeeklyFloors) {
        // if no data in storage then generate 
        weeklyFloors = initWeeklyEmptyFloorsBy([3, 4, 5]);
        // TODO: save generated-weeklyFloors to LocalStorage
    } else {
        // if data exists then get data from LocalStorage
        weeklyFloors = storageWeeklyFloors
    }
    return weeklyFloors
}

// TODO: save data to LocalStorage
function saveData(dataToSave) {
    localStorage.setItem("weeklyFloors", dataToSave)
}

// TODO: storage - if storage exists then delete old one

export {
    loadData
}