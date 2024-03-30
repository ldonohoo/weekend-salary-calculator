


/** initial notes
 * 
 * cool effects and css last
 * 
 * consider storing employee in separate object 
 *    could even store with element link attached????
 * 
 * could store in a object with a getter and setter?
 * keep date in array of employee objects 
 * 
 * should employees be stored in a Company???
 *          class w/global total salary,  **maybe next time
 *          employee array of objects 
 *          
 * or just a big object called company w/getters and
 * setters   **do this classes later
 * 
 * company = {totalSalaryOverhead: num, 
 *           employees: [ employee, employee, employee]
 * }
 * 
 *       each employee = { firstName: name, lastName: name, title: title, id: id, annualSalary: salary }
 * 
 */


/**
 * Create company datastructure object
 *      -add methods to get/set total salary
 *      -add methods to add/delete an employee
 */
const company = { _totalSalary: 0,
                  _employees : [],
                  // use 
                  get totalSalary() {
                    return this._totalSalary;
                  },
                  set totalSalary(salary) {
                    this._totalSalary = Number(salary);
                  },
                  addEmployee: function(firstName, lastName, title, id, annualSalary) {
                    this._employees.push( 
                        { firstName: firstName,
                          lastName: lastName,
                          title: title,
                          id: id,
                          annualSalary: annualSalary,
                         });
                    this.totalSalary += annualSalary;
                  },
                  deleteEmployee: function() {

                  }
                };

/**
 * Add employee to the Employees data structure,
 *    then add employee to the Employees table.
 *    After add complete, update the total monthly
 *    salary below the table.
 */  
function addNewEmployee(event) {
    // prevent default form activity from clearing form
    event.preventDefault();
    // get data from input fields
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let employeeId = document.getElementById("employee-id").value;
    let title = document.getElementById("title").value;
    let annualSalary = document.getElementById("annual-salary").value;
    // check for unique employee id???
    // add data to employees object
    company.addEmployee(firstName, lastName, employeeId, title, annualSalary);
    // update table with new employee
    displayEmployeeToTable(firstName, lastName, employeeId, title, annualSalary);
    updateMonthlySalary();
}

function displayEmployeeToTable(firstName, lastName, employeeId, title, annualSalary) {
    // create HTML table row to insert into table
    let employeeRow = `
        <tr>
            <th>${firstName}</th>
            <th>${lastName}</th>
            <th>${employeeId}</th>
            <th>${title}</th>
            <th>${annualSalary}</th>
        </tr>
    `;
    // insert row into HTML table body
    let bodyElement = document.getElementById("table-body");
    bodyElement.innerHTML += employeeRow;
}

function updateMonthlySalary() {
    // get the updated total annual salary for all employees
    let totalAnnualSalary = company.totalSalary;
    let monthlySalary = totalAnnualSalary / 12;
    let formattedSalary = monthlySalary;
    // update the Monthy Salary displayed below the table
    document.getElementById("total-monthly").innerText = formattedSalary;
}






