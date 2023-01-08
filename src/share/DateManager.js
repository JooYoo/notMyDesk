function getWeekDayEn(key) {
    let weekDay = ""
    switch (key) {
        case 1:
            weekDay = "Mon";
            break;
        case 2:
            weekDay = "Tue";
            break;
        case 3:
            weekDay = "Wed";
            break;
        case 4:
            weekDay = "Thu";
            break;
        case 5:
            weekDay = "Fri";
            break;
        case 6:
            weekDay = "Sat";
            break
        case 7:
            weekDay = "Sun";
            break;
    }
    return weekDay
}

function getWeekDates() {
    const today = new Date()
    let week = []

    for (let i = 1; i <= 7; i++) {
        const startDay = today.getDay() === 0 ? 7 : today.getDay();
        const day = today.setDate(today.getDate() - startDay + i)
        const date = new Date(day).toISOString().slice(0, 10)
        const monthName = new Date(day).toLocaleString('default', { month: 'short' })

        const currDay = {
            fullDate: date,
            weekDay: getWeekDayEn(i),
            monthDay: today.getDate(),
            monthName: monthName
        }

        week.push(currDay)
    }

    return week
}

function getCurrentDate() {
    let today = new Date
    // 2022-11-12
    let currDate = today.toISOString().slice(0, 10)
    // Mon ~ Sun
    let weekDay = getWeekDayEn(today.getDay() == 0 ? 7 : today.getDate())
    // 1 ~ 31
    let monthDay = today.getDate()

    const currDateInfo = {
        fullDate: currDate,
        weekDay: weekDay,
        monthDay: monthDay
    }

    return currDateInfo
}

// check if storage-data is out of date
function isWeeklyFloorOutOfDate(weeklyFloors) {
    let isOutOfDate = false

    // sort weekly-floors by date ascendly: old -> new 
    const sortedDateObjs = weeklyFloors.sort((a, b) => (a.fullDate > b.fullDate) ? 1 : -1)
    // get storage-weekly-oldest-date. e.g. 2022-12-05 Monday
    let storageFirstDate = sortedDateObjs[0].fullDate
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
    getWeekDates,
    getCurrentDate,
    isWeeklyFloorOutOfDate
}