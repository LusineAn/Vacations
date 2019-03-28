const connection = require('../database');
const path = require('path');

class VacationsController {
    
    home (req, res) {
        res.end('Hello Express');
    };

    getVacations (req, res) {
        const getVacations = `SELECT projects.name,
                                    employees.firstname,
                                    employees.lastname,
                                    vacations.start_date,
                                    vacations.end_date
                                    FROM vacations
                                    INNER JOIN employees ON employees.id = vacations.employee_id
                                    INNER JOIN projects ON projects.id = vacations.project_id
                                    ORDER BY projects.name`;
        connection.query(getVacations, (err, results) => {
            if(err) {
                return res.send(err);
            }
            return res.json({
                    data: results
            })
        })
    };
}
  
  module.exports = new VacationsController();