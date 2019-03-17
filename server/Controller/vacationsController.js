const connection = require('../database');

class VacationsController {
    
    home (req, res) {
      res.send('Go to /projects to see projects or go to /employee to see employees');
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
                            ORDER BY employees.firstname`;
        connection.query(projectsEemployees, (err, results) => {
            if(err) {
               return res.send(err);
            }
            console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
        })
    };
}
  
  module.exports = new VacationsController();