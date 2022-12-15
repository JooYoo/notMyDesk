import { getWeekDates } from "./DateManager.js";

// 1 => "1st Floor"
function getFloorNameEn(nr) {
    let floorName = ""
    switch (nr) {
        case 1:
            floorName = "1st Floor"
            break;
        case 2:
            floorName = "2nd Floor"
            break;
        case 3:
            floorName = "3rd Floor"
            break;
        case 4:
            floorName = "4th Floor"
            break;
        case 5:
            floorName = "5th Floor"
            break;
        default:
            break;
    }

    return floorName
}

// get seats by floorId and fullDate
function getFloorBy(weeklyDateObjs, floorId, fullDate) {
    // get date-obj
    let dateObj = weeklyDateObjs.find(x => x.fullDate == fullDate)
    let selectedFloor = dateObj.floors.find(x => x.id == floorId)
    return selectedFloor
}

// get floors by fullDate
function getFloorsBy(floors, fullDate) {
    let currDateObj = floors.find(x => x.fullDate === fullDate)
    let currDateFloors = currDateObj.floors
    return currDateFloors
}

// set seat by occupiedBy
function setOccupyToStore(floor, selectedSeat, newOccupiedBy) {
    // find target seat
    let seat = floor.seats.find((x) => x.deskNr === selectedSeat.deskNr);
    // set occupy
    seat.occupiedBy = newOccupiedBy
}

// group seats based on each-group-count for UI
function gatherGroups(seats, eachGroupCounts) {
    let groups = [];
    let eachGroup = eachGroupCounts;
    let index = 0;

    // iterate eachGroup
    for (let i = 0; i < eachGroup.length; i++) {
        // get current count
        const currCount = eachGroup[i];

        // group seats by eachGroup
        const newGroup = [];
        for (let j = 0; j < currCount; j++) {
            // if the seat not exist, break
            if (!seats[index]) {
                groups.push(newGroup);
                return groups;
            }

            // push the seat to newGroup
            const seat = seats[index];
            newGroup.push(seat);
            index++;
        }

        // add group to result
        groups.push(newGroup);
    }

    return groups;
}

// generate new seats x 32
function createSeats(floorId, floorName, fullDate) {
    // create seats for one floor
    let newSeats = []
    for (let i = 1; i < 33; i++) {
        const newSeat = {
            deskNr: i,
            occupiedBy: "",
            floorId: floorId,
            floorName: floorName,
            fullDate: fullDate
        }
        newSeats.push(newSeat)
    }
    return newSeats
}

// generate empty Floors for the whole week
// - param: floorNrArray => e.g. [3,4,5]
function generateWeeklyEmptyFloorsBy(floorNrArray) {
    // get current week dates
    let currentWeekDates = getWeekDates()

    let weeklyFloors = []

    // iterate week-dates: 7 days
    currentWeekDates.forEach(currDate => {
        let newFloors = []
        let currFullDate = currDate.fullDate

        let newWeeklyFloor = {
            fullDate: currFullDate,
            floors: newFloors
        }

        // iterate floors: 3 floors
        floorNrArray.forEach(floorNr => {
            let floorId = floorNr
            let floorName = getFloorNameEn(floorNr)
            // iterate seats: 32 seats
            let newSeats = createSeats(floorId, floorName, currFullDate)

            let newFloor = {
                id: floorId,
                floorName: floorName,
                fullDate: currFullDate,
                seats: newSeats
            }
            newFloors.push(newFloor)
        })
        weeklyFloors.push(newWeeklyFloor)
    })

    return weeklyFloors
}

export {
    getFloorBy,
    getFloorsBy,
    setOccupyToStore,
    gatherGroups,
    generateWeeklyEmptyFloorsBy
}