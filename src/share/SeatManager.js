import { getWeekDates } from "./DateManager.js";

// 1 => "1st Floor"
function _computeFloorNameEn(nr) {
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

// compute seat-side based on desk-nr
function _computeSide(deskNr) {
    return deskNr < 17 ? 'left' : 'right'
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

// get left/right-seats from the selected-floor
function _getSelectedFloorSeatsForOneRoom(selectedFloor, roomSide) {
    // get selected-floor-seats
    var selectedFloorSeats = selectedFloor.seats;
    // get current floor left/right seats
    var seats = selectedFloorSeats.filter(seat => seat.side == roomSide);

    return seats;
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

// get one-room-seat-groups
function getOneRoomSeatGroups(selectedFloor, roomSide) {
    // seats for one room
    let oneRoomSeats = _getSelectedFloorSeatsForOneRoom(selectedFloor, roomSide)
    // one room seat groups
    let oneRoomSeatGroups = gatherGroups(oneRoomSeats, [6, 6, 4])

    return oneRoomSeatGroups
}

// generate new seats x 32
function _generateSeats(floorId, floorName, fullDate) {
    // create seats for one floor
    let newSeats = []
    for (let i = 1; i < 33; i++) {
        // compute seat side
        const seatSide = _computeSide(i)
        // new seat instance
        const newSeat = {
            deskNr: i,
            occupiedBy: "",
            floorId: floorId,
            floorName: floorName,
            fullDate: fullDate,
            side: seatSide
        }
        newSeats.push(newSeat)
    }
    return newSeats
}

// generate empty weekly-date-objs
// - floorNrArray: e.g. [3,4,5]
function generateWeeklyDateObjs(floorNrArray) {
    let weeklyDateObjs = []

    // get current week dates
    let currentWeekDates = getWeekDates()

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
            let floorName = _computeFloorNameEn(floorNr)
            // iterate seats: 32 seats
            let newSeats = _generateSeats(floorId, floorName, currFullDate)

            let newFloor = {
                id: floorId,
                floorName: floorName,
                fullDate: currFullDate,
                seats: newSeats
            }
            newFloors.push(newFloor)
        })
        weeklyDateObjs.push(newWeeklyFloor)
    })

    return weeklyDateObjs
}

export {
    getFloorBy,
    getFloorsBy,
    setOccupyToStore,
    gatherGroups,
    generateWeeklyDateObjs,
    getOneRoomSeatGroups
}