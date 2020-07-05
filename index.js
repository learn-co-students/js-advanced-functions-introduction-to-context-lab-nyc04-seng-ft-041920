// Your code here
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// arr = ["Gray", "Worm", "Security", 1]
let createEmployeeRecord = (arr) => {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

let createEmployeeRecords = (arrs) => {
  return arrs.map(createEmployeeRecord)
}

let createTimeInEvent = (employee, time) => {
  let [date, hour] = time.split(' ')
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  })
  return employee
}

let createTimeOutEvent = (employee, time) => {
  let [date, hour] = time.split(' ')
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  })
  return employee
}

let hoursWorkedOnDate = (employee, day) => {
  let specificDayIn = employee.timeInEvents.find(timestamp => timestamp.date == day)
  let specificDayOut = employee.timeOutEvents.find(timestamp => timestamp.date == day)
  return (specificDayOut.hour - specificDayIn.hour) / 100
}

let wagesEarnedOnDate = (employee, day) => {
  return hoursWorkedOnDate(employee, day) * employee.payPerHour
}

let allWagesFor = (employee) => {
  let dates = employee.timeOutEvents.map(timeStamp => timeStamp.date)
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

let calculatePayroll = (arr) => {
  return arr.reduce((total, employee) => total + allWagesFor(employee), 0)
}

let findEmployeeByFirstName = (arr, str) => {
  return arr.find(employee => employee.firstName === str)
}
