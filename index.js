function createEmployeeRecord(infoArray){
  return {
    firstName: infoArray[0],
    familyName: infoArray[1],
    title: infoArray[2],
    payPerHour: infoArray[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}


function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employeeRecordObj, dateStamp){
  // split datestamp into date, and time
  const dateTimeArr = dateStamp.split(" ")
  const timeObj = {
    type: "TimeIn",
    hour: parseInt(dateTimeArr[1], 10),
    date: dateTimeArr[0]
  }
  employeeRecordObj.timeInEvents.push(timeObj)
  return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp){
  const dateTimeArr = dateStamp.split(" ")
  const timeObj = {
    type: "TimeOut",
    hour: parseInt(dateTimeArr[1], 10),
    date: dateTimeArr[0]
  }
  employeeRecordObj.timeOutEvents.push(timeObj)
  return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date){
  const timeOutObjArr = employeeRecordObj.timeOutEvents.filter(timeObj => timeObj.date === date)
  const timeOut = timeOutObjArr[0].hour

  const timeInObjArr = employeeRecordObj.timeInEvents.filter(timeObj => timeObj.date === date)
  const timeIn = timeInObjArr[0].hour

  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecordObj, date){
  return employeeRecordObj.payPerHour * hoursWorkedOnDate(employeeRecordObj, date)
}

function allWagesFor(employeeRecordObj){
  // for each timeObj
  // find wagesEarnedOnDate
  const allDates = employeeRecordObj.timeInEvents.map(timeObj => timeObj.date)
  console.log(allDates)
  const reducer = (sum, currentDate) => sum + wagesEarnedOnDate(employeeRecordObj, currentDate) 
  console.log("test:", allDates.reduce(reducer))
  return allDates.reduce(reducer, 0)
}

function calculatePayroll(employeeArr){
  const reducer = (sum, currentEmployee) => sum + allWagesFor(currentEmployee)
  return employeeArr.reduce(reducer, 0)
}

function findEmployeeByFirstName(employeeArr, firstName){
  return employeeArr.filter(employee => employee.firstName === firstName)[0]
}
