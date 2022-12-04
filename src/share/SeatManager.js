function createNewFloor(floorId, floorName, fullDate) {
    // create seats for one floor
    let newSeats = []
    for (let i = 1; i < 33; i++) {
        const newSeat = {
            "deskNr": i,
            "occupiedBy": ""
        }
        newSeats.push(newSeat)
    }
    // new Floor obj
    const newFloor = {
        id: floorId,
        floorName: floorName,
        date: fullDate,
        seats: newSeats
    }
    return newFloor
}

// init empty floors for the whole week
function initEmptyFloorsForOneWeek(params) {
    // 
}

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

export {
    gatherGroups
}