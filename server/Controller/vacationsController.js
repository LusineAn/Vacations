const connection = require('../database');
const path = require('path');

class VacationsController {
    
    home (req, res) {
        res.end('Hello Express');
    };

    getVacations (req, res) {
        const projectsEemployees = `Select employees.lastname,
                            employees.firstname,
                            projects.name,
                            vacations.start_date,
                            vacations.end_date
                            FROM vacations
                            INNER JOIN employees on employees.id = vacations.employee_id
                            INNER JOIN projects on projects.id = vacations.id
                            ORDER BY projects.name`;
        connection.query(projectsEemployees, (err, results) => {
            if(err) {
               return res.send(err);
            }
            console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
            return res.json({
                data: results
        })
        })
    };
}
  
  module.exports = new VacationsController();