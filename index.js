// Your code here
function createEmployeeRecord(employeeArr){
  const employeeObj = {
    firstName: employeeArr[0],
    familyName: employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employeeObj
}

function createEmployeeRecords(arrOfEmployee) {
  return arrOfEmployee.map(employee => {
     return createEmployeeRecord(employee)
  })
}

function createTimeInEvent(employeeObj, dateStamp) {
  const dateStampSplit = dateStamp.split(' ')
  //let [date, hour] = dateStamp.split(' ')
  employeeObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStampSplit[1].trim()),
    date: dateStampSplit[0]
  })
  return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
  const dateStampSplit = dateStamp.split(' ')
  //let [date, hour] = dateStamp.split(' ')
  employeeObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStampSplit[1].trim()),
    date: dateStampSplit[0]
  })
  return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
  const timeIn = employeeObj.timeInEvents.find(timeIn => timeIn.date === date)
  const timeOut = employeeObj.timeOutEvents.find(timeOut => timeOut.date === date)
  const workedHours = (timeOut.hour - timeIn.hour)/100
  
  return workedHours
}

function wagesEarnedOnDate(employeeObj, date) {
  return hoursWorkedOnDate(employeeObj, date) * parseFloat(employeeObj.payPerHour)
}

function allWagesFor(employeeObj) {
  const workedDates = employeeObj.timeInEvents.map(timeIn => timeIn.date )
  const wages = workedDates.reduce(function (total, date) {
    return total + wagesEarnedOnDate(employeeObj, date)
  }, 0)
  return wages
}

function findEmployeeByFirstName(arrOfemployeeObj, firstName) {
  return arrOfemployeeObj.find(employeeObj => employeeObj.firstName === firstName)
}

function calculatePayroll(arrOfemployeeObj) {
  return arrOfemployeeObj.map(employeeObj => allWagesFor(employeeObj))
    .reduce(function (total, indivisualSum) {return total + indivisualSum})
}