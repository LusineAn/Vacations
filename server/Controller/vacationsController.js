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
        console.log('update vacations');
        const {employee_id, project_id, start_date, end_date} = req.query;
        // const start_date = STR_TO_DATE(`${req.query.start_date}`, '%M/%d/%Y');
        // const end_date = STR_TO_DATE(`${req.query.end_date}`, '%M/%d/%Y');
        console.log('employee_id: ' + employee_id);
        console.log('project_id: ' + project_id);
        console.log('start_date: ' + start_date);
        console.log('end_date: ' + end_date);
        const updateVacation = `UPDATE vacations
                                SET start_date = STR_TO_DATE('${start_date}', '%M/%d/%Y'),
                                end_date = STR_TO_DATE('${end_date}', '%M/%d/%Y')
                                WHERE employee_id = '${employee_id}'
                                AND project_id = '${project_id}'`;

        connection.query(updateVacation, (err, results) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            console.log(`Vacations successfully updated`);
            return res.send({});
        });
    };
}
  
  module.exports = new VacationsController();