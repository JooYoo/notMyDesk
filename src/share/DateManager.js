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
    let curr = new Date
    let week = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let date = new Date(curr.setDate(first)).toISOString().slice(0, 10)

        const currDay = {
            fullDate: date,
            weekDay: getWeekDayEn(i),
            monthDay: curr.getDate()
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
    let weekDay = getWeekDayEn(today.getDay())
    // 1 ~ 31
    let monthDay = today.getDate()

    const currDateInfo = {
        fullDate: currDate,
        weekDay: weekDay,
        monthDay: monthDay
    }

    return currDateInfo
}

export {
    getWeekDates,
    getCurrentDate
}