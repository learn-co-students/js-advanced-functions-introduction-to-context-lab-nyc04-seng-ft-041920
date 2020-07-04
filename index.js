// firstName, lastName, title, hourlyRate

function createEmployeeRecord(employeeDetails) {
    const employeeRecord = {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

function createEmployeeRecords(aoa) {
    return aoa.map(function(arr) {
        return createEmployeeRecord(arr)
    })
}

function createTimeInEvent(employeeObj, dateStamp) {
    const timeDate = dateStamp.split(" ")
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(timeDate[1]),
        date: timeDate[0]
    }
    employeeObj.timeInEvents.push(timeObj)
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
    const timeDate = dateStamp.split(" ")
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(timeDate[1]),
        date: timeDate[0]
    }
    employeeObj.timeOutEvents.push(timeObj)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    const timeIn = employeeObj.timeInEvents.find(function(timeIn) {
        return timeIn.date === date
    })

    const timeOut = employeeObj.timeOutEvents.find(function(timeOut) {
        return timeOut.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeObj, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObj, date)
    const wagesEarned = employeeObj.payPerHour * hoursWorked
    return wagesEarned
}

function allWagesFor(employeeObj) {
    const allDates = employeeObj.timeInEvents.map(function(timeObj){
        return timeObj.date
    })
   const wagesOwed = allDates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(employeeObj, date)
    }, 0)
    return wagesOwed
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employeeObj) {
        return employeeObj.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employeeObj) {
        return total + allWagesFor(employeeObj)
    },0)
}

// const fakeEmployee = {
//     firstName: "nicki",
//     familyName: "minaj",
//     title: "queen",
//     payPerHour: 5000,
//     timeInEvents: [{
//         type: "TimeIn",
//         hour: 800,
//         date: "1994-09-27"
//     },
//     {
//         type: "TimeIn",
//         hour: 800,
//         date: "1994-09-28"
//     } 
//     ],
//     timeOutEvents: [{
//         type: "TimeOut",
//         hour: 1600,
//         date: "1994-09-27"
//     },
//     {
//         type: "TimeOut",
//         hour: 1600,
//         date: "1994-09-27"
//     }]
// }

// allWagesFor(fakeEmployee)