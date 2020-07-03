function createEmployeeRecord(arr) {


    const employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arr) {
    const records = arr.map((r) => createEmployeeRecord(r))
    return records
}


function createTimeInEvent(record, time) {
    let nTime = parseFloat(time.slice(11));
    // nTime = nTime.slice(1, -1)
    let date = time.slice(0, 10);
    // date = date.slice(0, 1);

    const timeObj = {
        type: "TimeIn",
        hour: nTime,
        date: date
    }
    record.timeInEvents.push(timeObj)
    return record
}


function createTimeOutEvent(record, time) {
    let nTime = parseFloat(time.slice(11));
    let date = time.slice(0, 10);
    const timeObj = {
        type: "TimeOut",
        hour: nTime,
        date: date
    }
    record.timeOutEvents.push(timeObj)
    return record
}


function hoursWorkedOnDate(rec, date) {
    const punchIn = rec.timeInEvents.find((TimeIn) => TimeIn.date === date)
    const punchOut = rec.timeOutEvents.find((TimeOut) => TimeOut.date === date)
    const totalHrs = (punchOut.hour - punchIn.hour) / 100;
    return totalHrs
}


function wagesEarnedOnDate(rec, date) {
    return hoursWorkedOnDate(rec, date) * rec.payPerHour
}

function allWagesFor(cRecord) {
    const wages = cRecord.timeInEvents.map((day) => wagesEarnedOnDate(cRecord, day.date))
    const payRoll = wages.reduce((acc, cur) => acc + cur)
    return payRoll
}

function calculatePayroll(employees) {
    const payRoll = employees.map((employee) => allWagesFor(employee)).flat()
    const totalPayroll = payRoll.reduce((acc, curr) => acc + curr)
    return totalPayroll
}

function findEmployeeByFirstName(employees, name) {
    const emp = employees.find((emp) => emp.firstName === name)
    return emp
}