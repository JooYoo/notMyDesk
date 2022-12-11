import { initWeeklyEmptyFloorsBy } from "@/share/SeatManager";

// load data from LocalStorage
function loadData() {
    let weeklyFloors = null
    const storageWeeklyFloors = localStorage.getItem("weeklyFloors")
    if (!storageWeeklyFloors) {
        // if no data in storage then generate 
        weeklyFloors = initWeeklyEmptyFloorsBy([3, 4, 5]);
        // save new generated data to localStorage
        saveData(weeklyFloors)
    } else {
        // if data exists then get data from LocalStorage
        weeklyFloors = JSON.parse(storageWeeklyFloors)
    }
    return weeklyFloors
}

// TODO: save data to LocalStorage
function saveData(dataToSave) {
    localStorage.setItem("weeklyFloors", JSON.stringify(dataToSave))
}

// TODO: storage - if storage exists then delete old one

export {
    loadData,
    saveData
}