


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
                  _budget: 20000,
                  _employees : [],
                  // use 
                  get totalSalary() {
                    return this._totalSalary;
                  },
                  set totalSalary(salary) {
                    this._totalSalary = Number(salary);
                  },
                  get budget() {
                    return this._budget;
                  },
                  set budget(newBudget) {
                    this._budget = newBudget;
                  },
                  addEmployee: function(firstName, lastName, id, title, annualSalary) {
                    this._employees.push( 
                        { firstName: firstName,
                          lastName: lastName,
                          id: id,
                          title: title,
                          annualSalary: annualSalary,
                         });
                    this.totalSalary += annualSalary;
                  },
                  deleteEmployee: function(idToDelete) {
                    for (let i=0; i<this._employees.length; i++) {
                      if (this._employees[i].id === idToDelete) {
                        this.totalSalary -= this._employees[i].annualSalary;
                        this._employees.splice(i,1);
                      }
                    }
                    console.log('yeah deleting...');
                  },
                  validEmployeeId(idToValidate) {
                    for (let employee of this._employees) {
                      if (employee.id === idToValidate) {
                        return false;
                      } 
                    }
                    return true;
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
    // get input elements to retrieve & manipulate values
    let firstNameElement = document.getElementById("first-name");
    let lastNameElement = document.getElementById("last-name");
    let employeeIdElement = document.getElementById("employee-id");
    let titleElement = document.getElementById("title");
    let annualSalaryElement = document.getElementById("annual-salary");
    // get data from input fields
    let firstName = firstNameElement.value;
    let lastName = lastNameElement.value;
    let employeeId = employeeIdElement.value;
    let title = titleElement.value;
    let annualSalaryString = annualSalaryElement.value;
    let annualSalary = convertStringToCurrency(annualSalaryString);
    // check for unique employee id
    if (!company.validEmployeeId(employeeId)) {
      // display error message
      // highlight employee id
      // get data again
      alert('error invalid employee id!!!');
    }
    // add data to employees object
    company.addEmployee(firstName, lastName, employeeId, title, annualSalary);
    // update table with new employee
    displayEmployeeToTable(firstName, lastName, employeeId, title, annualSalary);
    updateMonthlySalary();
    // clear form fields for next input
    firstNameElement.value = '';
    lastNameElement.value = '';
    employeeIdElement.value = '';
    titleElement.value = '';
    annualSalaryElement.value = '';
}

function displayEmployeeToTable(firstName, lastName, employeeId, title, annualSalary) {
    // reformat currency to be a string with correct commas, decimal, $
    annualSalary = formatCurrency(annualSalary);
    // create HTML table row to insert into table
    let employeeRow = `
        <tr>
            <th>${firstName}</th>
            <th>${lastName}</th>
            <th>${employeeId}</th>
            <th>${title}</th>
            <th>${annualSalary}</th>
            <th><button employee-id="${employeeId}" onclick="deleteEmployee(event)">Delete</button></th>
        </tr>
    `;
    // insert row into HTML table body
    let bodyElement = document.getElementById("table-body");
    bodyElement.innerHTML += employeeRow;
}

function updateMonthlySalary() {
  // get the updated total annual salary for all employees
  let totalAnnualSalary = company.totalSalary;
  let monthlySalary = (totalAnnualSalary / 12).toFixed(2);
  // force monthly salary back to number after toFixed changes it to string
  monthlySalary = Number(monthlySalary);
  monthlySalaryElement = document.getElementById("total-monthly");
  // check to see if the over-budget styling class on the footer element
  let footerElement = document.getElementById("totals-section");
  let overBudgetOn = footerElement.classList.contains("over-budget");
  // if the salary is over the budget and the budget styling class is not on,
  //      - toggle it on
  if (monthlySalary > company.budget && !overBudgetOn) {
    footerElement.classList.toggle("over-budget");
  // else if salary is less than budget and the over budget styling is on, 
  //      - toggle it off
  } else if (monthlySalary <= company.budget && overBudgetOn) {
    footerElement.classList.toggle("over-budget");
  }
  // format the Salary 
  let formattedSalary = formatCurrency(monthlySalary);
  // update the Monthy Salary displayed below the table
  monthlySalaryElement.textContent = formattedSalary;
  // now add the stupid monthly salary to the actual footer element
  //    so it passes the stupid tests
  // document.getElementById("totals-section").textContent = formattedSalary;
}

function formatCurrency(amount) {
  let currencyString = 
    Intl.NumberFormat('US', { style: 'currency', currency: 'USD' }).format(amount);
    // ***THIS done to pass the tests which expect no decimal value
    // if decimal values are zero, remove decimal from currency string
    // let lastIndex = currencyString.length -1;
    // if (currencyString[lastIndex] === '0' && currencyString[lastIndex-1] === '0') {
    //   currencyString = currencyString.substring(0, lastIndex-2);
    // }
    // currencyString = currencyString.substring(1, currencyString.length);
    // end try to fix it for the stupid tests
  return currencyString;
}  

function convertStringToCurrency(string) {
  // convert string to a 2-digit decimal number for storage
  let currency = Number(string);
  currency = currency.toFixed(2);
  // force back to number after toFixed changes it to string
  currency = Number(currency);
  return currency;
}

function deleteEmployee(event) {
  let employeeId = event.target.getAttribute('employee-id');
  company.deleteEmployee(employeeId);
  event.target.parentElement.parentElement.remove();
  updateMonthlySalary();
}


