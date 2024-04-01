/**
 * Lisa Donohoo
 * Prime Digital Academy
 * Tier II Weekend Calculator Challenge
 * March 30, 2024
 */



/**
 * Create company datastructure object
 *      -add methods to get/set total salary
 *      -add methods to add/delete an employee
 *      -add methods to get/set budget
 *      -add method to validate employee id and make
 *        sure it is unique (since using as key to 
 *        delete and find object later)
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
      // highlight employee id (future)
      // get data again (future)
      alert('error invalid employee id!!! You should panic as I did not handle this error lol...');
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

/**
 * given a bunch of employee info:
 *    - creates a new row for our table and inserts the row into the
 *        table body
 */
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

/**
 * Pull the updated total salary from the company object,
 *    find the monthly salary,
 *    turn on the over-budget style if over budget,
 *    then format the monthly salary and insert into the footer
 */
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
}

/**
 * format an number into a pretty currency string
 */
function formatCurrency(amount) {
  let currencyString = 
    Intl.NumberFormat('US', { style: 'currency', currency: 'USD' }).format(amount);
  return currencyString;
}  

/**
 * convert a text number string (from input field) to a two-digit decimal number
 */
function convertStringToCurrency(string) {
  // convert string to a 2-digit decimal number for storage
  let currency = Number(string);
  currency = currency.toFixed(2);
  // force back to number after toFixed changes it to string
  currency = Number(currency);
  return currency;
}

/**
 * delete an employee:
 *    - first get the custom employee attribute stored on button
 *    - then use that employee-id to delete the employee in
 *        the company object (which reduces the total salary also)
 *    - then updates the monthly salary shown in the footer
 */
function deleteEmployee(event) {
  let employeeId = event.target.getAttribute('employee-id');
  company.deleteEmployee(employeeId);
  event.target.parentElement.parentElement.remove();
  updateMonthlySalary();
}


