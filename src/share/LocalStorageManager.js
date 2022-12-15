import { initWeeklyEmptyFloorsBy, generateWeeklyEmptyFloorsBy } from "@/share/SeatManager";
import { getWeekDates } from "@/share/DateManager";

// storage - load data from LocalStorage
function loadData() {
    let weeklyFloors = null
    // if data is out of date then clean up localStorage
    cleanData()
    // try to load data from localStorage
    const storageWeeklyFloors = localStorage.getItem("weeklyDateObjs")
    // if no data in storage then generate 
    if (!storageWeeklyFloors) {
        weeklyFloors = generateWeeklyEmptyFloorsBy([3, 4, 5]);
        // save new generated data to localStorage
        saveData(weeklyFloors)
    } else {
        // if data exists then get data from LocalStorage
        weeklyFloors = JSON.parse(storageWeeklyFloors)
    }
    return weeklyFloors
}

//  storage - save data to LocalStorage
function saveData(dataToSave) {
    localStorage.setItem("weeklyDateObjs", JSON.stringify(dataToSave))
}

// storage - if storage exists then delete old data
function cleanData() {
    // try to load data from localStorage
    const storageWeeklyFloors = localStorage.getItem("weeklyDateObjs")
    // if data exists then handle data
    if (storageWeeklyFloors) {
        let weeklyFloors = JSON.parse(storageWeeklyFloors)

        // if data out of date then clean up localStorage
        let shouldCleanStorage = isWeeklyFloorOutOfDate(weeklyFloors)

        // clean up localStorage
        if (shouldCleanStorage) {
            localStorage.clear()
        }
    }
}

// check if storage-data is out of date
function isWeeklyFloorOutOfDate(weeklyFloors) {
    let isOutOfDate = false

    // get storage-weekly-oldest-date. e.g. 2022-12-05
    let storageFirstDate = weeklyFloors[0].fullDate
    // get current-weekly-dates
    let currentWeekDates = getWeekDates()
    // get current-weekly-first-date
    let currentFirstDate = currentWeekDates[0].fullDate
    /*
     * if storage-weekly-first-date is not the same as
     * current-weekly-first-date, it means the storage-date is
     * out of date
     */
    if (storageFirstDate != currentFirstDate) {
        isOutOfDate = true
    }

    return isOutOfDate
}

export {
    loadData,
    saveData
}