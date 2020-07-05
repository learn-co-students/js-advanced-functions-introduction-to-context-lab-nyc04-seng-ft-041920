// Your code here
//employeeInfo - an array of Info

function createEmployeeRecord(employeeInfo) {

    const employeeCard = {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour:employeeInfo[3],
    timeInEvents:[],
    timeOutEvents:[]
    }
    return employeeCard;
};

function createEmployeeRecords(aoa) {
    return aoa.map(function(arr) {
        return createEmployeeRecord(arr)
    })
};

function createTimeInEvent(emplyeeObject, dateStamp) {
    const time = dateStamp.split(" ")
    const timeObject = {
        type: "TimeIn",
        hour: parseInt(time[1]),
        date: time[0]
    }
    emplyeeObject.timeInEvents.push(timeObject)
    return emplyeeObject
};

function createTimeOutEvent(emplyeeObject, dateStamp) {
    const time = dateStamp.split(" ")
    const timeObject = {
        type: "TimeOut",
        hour: parseInt(time[1]),
        date: time[0]
    }
    emplyeeObject.timeOutEvents.push(timeObject)
    return emplyeeObject
};

function hoursWorkedOnDate(employeeObject, date) {
    const timeIn = employeeObject.timeInEvents.find(function(timeIn) {
        return timeIn.date === date
    })

    const timeOut = employeeObject.timeOutEvents.find(function(timeOut) {
        return timeOut.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeObject, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObject, date)
    const wagesEarned = employeeObject.payPerHour * hoursWorked
    return wagesEarned
}

function allWagesFor(employeeObject) {
    const allDates = employeeObject.timeInEvents.map(function(timeObject){
        return timeObject.date
    })
    const wagesOwed = allDates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(employeeObject, date)
    }, 0)
    return wagesOwed
}

function findEmployeeByFirstName(arr, firstName) {
    return arr.find(function(employeeObject) {
        return employeeObject.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employeeObject) {
        return total + allWagesFor(employeeObject)
    },0)
}