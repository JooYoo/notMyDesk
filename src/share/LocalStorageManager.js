import { initWeeklyEmptyFloorsBy } from "@/share/SeatManager";
import { getWeekDates } from "@/share/DateManager";

// storage - load data from LocalStorage
function loadData() {
    let weeklyFloors = null
    // if data is out of date then clean up localStorage
    cleanData()
    // try to load data from localStorage
    const storageWeeklyFloors = localStorage.getItem("weeklyFloors")
    // if no data in storage then generate 
    if (!storageWeeklyFloors) {
        weeklyFloors = initWeeklyEmptyFloorsBy([3, 4, 5]);
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
    localStorage.setItem("weeklyFloors", JSON.stringify(dataToSave))
}

// TODO: storage - if storage exists then delete old data
function cleanData() {
    // try to load data from localStorage
    const storageWeeklyFloors = localStorage.getItem("weeklyFloors")
    // if data exists then handle data
    if (storageWeeklyFloors) {
        let weeklyFloors = JSON.parse(storageWeeklyFloors)

        // if data out of date then clean up localStorage
        let shouldCleanStorage = isWeeklyFloorOutOfDate(weeklyFloors)

        /**
         * TODO: check when new week statrs
         * 
         * weeklyFloors should contains 21 items, 
         * starts from current week Monday
         * 
         * shouldCleanStorage should be true
         **/
        console.log(weeklyFloors);
        console.log(`shouldCleanStorage: ${shouldCleanStorage}`);
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
    let storageFirstDate = weeklyFloors[0].date
    // get current-weekly-dates
    let currentWeekDates = getWeekDates()
    // get current-weekly-oldest-date
    let currentFirstDate = currentWeekDates[0].fullDate
    /*
     * if storage-weekly-oldest-date is not the same as
     * current-weekly-oldest-date, it means the storage-date is
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