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
                                    vacations.employee_id,
                                    vacations.project_id,
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

    updateVacations (req, res) {
        const {employee_id, project_id, start_date, end_date} = req.query;
        const updateVacation = `UPDATE Vacations
                                SET start_date = '${start_date}', end_date = '${end_date}'
                                WHERE employee_id = ${employee_id}
                                AND project_id = ${project_id}`;

        connection.query(updateVacation, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`Vacations successfully updated`);
            return res.send({});
        });
    };
}
  
  module.exports = new VacationsController();