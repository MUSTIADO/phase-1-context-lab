// Function to create an employee record object from an array of data
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],      // First name of the employee
        familyName: row[1],     // Family name of the employee
        title: row[2],          // Title of the employee
        payPerHour: row[3],     // Pay per hour for the employee
        timeInEvents: [],       // Array to store time in events
        timeOutEvents: []       // Array to store time out events
    }
}

// Function to create employee records from an array of arrays of data
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row); // Creating employee record for each row
    })
}

// Function to add a time in event for an employee
let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' '); // Splitting date and hour from date stamp

    // Adding time in event to the employee's record
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), // Parsing hour to integer
        date,
    })

    return this; // Returning the employee record
}

// Function to add a time out event for an employee
let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' '); // Splitting date and hour from date stamp

    // Adding time out event to the employee's record
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), // Parsing hour to integer
        date,
    })

    return this; // Returning the employee record
}

// Function to calculate hours worked by an employee on a specific date
let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate; // Finding time in event for the sought date
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate; // Finding time out event for the sought date
    })

    return (outEvent.hour - inEvent.hour) / 100; // Calculating hours worked
}

// Function to calculate wages earned by an employee on a specific date
let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour; // Calculating raw wage
    return parseFloat(rawWage.toString()); // Returning the wage as a float
}

// Function to calculate total wages earned by an employee
let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date; // Extracting all eligible dates
    })

    // Calculating total wages by summing wages for all eligible dates
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d); // Calculating wages for each date
    }.bind(this), 0)

    return payable; // Returning the total wages
}

// Function to find an employee by first name in an array of employee records
let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName; // Finding employee with matching first name
  })
}

// Function to calculate total payroll for all employees
let calculatePayroll = function(arrayOfEmployeeRecords){
    // Calculating total payroll by summing wages for all employee records
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec); // Calculating wages for each employee
    }, 0)
}
