const connection = require('../database');

class EmployeesController {
    
    getEmployees (req, res) {        
        const getEmployeesAndProjects = `SELECT employees.firstname,
                                        employees.lastname,
                                        projects.name
                                        FROM vacations
                                        INNER JOIN employees ON employees.id = vacations.employee_id
                                        INNER JOIN projects ON projects.id = vacations.project_id
                                        ORDER BY employees.firstname`;
        connection.query(getEmployeesAndProjects, (err, results) => {
            if(err) {
                return res.send(err);
            }
            return res.json({
                    data: results
            })
        })
    };
    
    addEmployee (req, res) {
        const {firstname, lastname, project} = req.query;
        const insertEmployee = `INSERT INTO employees (firstname, lastname) VALUES('${firstname}', '${lastname}')`;
        
        connection.query(insertEmployee, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`Employee '${firstname}', '${lastname}' successfully added`);
            const employeeId = results.insertId;
            console.log('employeeId:' + employeeId);

            const insertIntoVacations = `INSERT INTO vacations (project_id, employee_id)
            SELECT p.id, e.id
            FROM projects p, employees e
            WHERE p.name = ?
            AND e.firstname = ?
            AND e.lastname = ?`;

            connection.query(insertIntoVacations, [project, firstname, lastname], (err, results, fields) => {
                if(err) {
                    console.log(err);
                    return res.send(err);
                }
                console.log("Inserted into VACATIONS!!!");
            });
        });
    };
    
    deleteEmployee (req, res) {
        const {firstname, lastname} = req.query;

        const deleteEmployeeFromVacations = `DELETE FROM vacations
                                            WHERE employee_id = (
                                            SELECT id FROM employees
                                            WHERE firstname = ?
                                            AND lastname = ?)`;        
        connection.query(deleteEmployeeFromVacations, [firstname, lastname], (err, results) => {
           if(err) {
               console.log(err);
               return res.send(err);
           }
           console.log(`Employee '${firstname} ${lastname}' successfully deleted from Vacations`);
           const deleteEmployeeFromEmployees = `DELETE FROM employees
                                                WHERE firstname = '${firstname}'
                                                AND lastname='${lastname}'`;
           connection.query(deleteEmployeeFromEmployees, [firstname, lastname], (err, results) => {
                if(err) {
                    console.log(err);
                    return res.send(err);
                }
                console.log(`Project '${firstname} ${lastname}' successfully deleted from Employees`);
           })
       })
    };
}
  
  module.exports = new EmployeesController();