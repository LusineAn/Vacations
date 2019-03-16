const connection = require('./database');

class Controller {
    
    home (req, res) {
      res.send('Go to /projects to see projects or go to /employee to see employees');
    };

    getProjects (req, res) {
        console.log('GET PROJECTS -------- : ');
        const allProjects = 'SELECT * FROM projects';
        
        connection.query(allProjects, (err, results) => {
            if(err) {
                return res.send(err);
            }
            return res.json({
                data: results
            })
        })
    };
    
    addProject (req, res) {
        console.log('ADD PROJECT -------- : ');
        const {name} = req.query;
        const insertProject = `INSERT INTO projects (name) VALUES('${name}')`;
        
        connection.query(insertProject, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`Project '${name}' successfully added`);
            return res.send(`Project '${name}' successfully added`);
        })
    };
    
    deleteProject (req, res) {
        const {name} = req.query;
        console.log('req.query: -------- : ', name);
        const deleteProject = `DELETE FROM projects WHERE name = '${name}'`;
        
        connection.query(deleteProject, (err, results) => {
           if(err) {
               return res.send(err);
           }
           console.log(`Project '${name}' successfully deleted`);
       })
    };
    
    updateProject (req, res) {
        const {newName} = req.query;
        const {oldName} = req.name;
        console.log('req.query: -------- : ', name);
        const updateProject = `UPDATE projects SET name = '${newName}' WHERE name = '${oldName}'`;
        
        connection.query(updateProject, (err, results) => {
           if(err) {
               return res.send(err);
           }
           console.log(`Project '${name}' successfully updated`);
       })
    };
    
    getEmployees (req, res) {
        const allEmployees = 'SELECT * FROM employees';
        
        connection.query(allEmployees, (err, results) => {
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
            const employeeId = this.getEmployeeId(firstname, lastname);
            const projectId = this.getProjectId(project);
            console.log(`employeeId '${employeeId}', projectId '${projectId}'`);
            connectEmployeeToProject(employeeId, projectId);
        });
    };

    getEmployeeId(firstname, lastname) {
        const getEmployeeId = `SELECT id FROM employees WHERE
        employees.firstname = '${firstname}' AND
        employees.lastname = '${lastname}'`;
        const employeeId = connection.query(getEmployeeId, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`employeeId '${results}'`);
        });
        return employeeId;
    };

    getProjectId(projectName) {
        const getProjectId = `SELECT id FROM projects WHERE projects.name = '${projectName}`;
        const projectId = connection.query(getProjectId, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`projectId '${results}'`);
        });
        return projectId;
    };

    connectEmployeeToProject (employeeId, projectId) {
        console.log(`employeeId:  '${employeeId}'`);
        console.log(`projectId:  '${projectId}'`);
        const insertIntoVacations = `INSERT INTO vacations (project_id, employee_id)
        VALUES ('${projectId}','${employeeId}')`;
        
        connection.query(insertIntoVacations, (err, results) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            console.log(`insertIntoVacations`);
        });
    };
    
    deleteEmployee (req, res) {
        const {firstname, lastname} = req.query;
        console.log('first-lastname: -------- : ', firstname, lastname);
        const deleteEmployee = `DELETE FROM employees WHERE (firstname = '${firstname}' AND lastname = '${lastname}')`;
        
        connection.query(deleteEmployee, (err, results) => {
            if(err) {
               return res.send(err);
            }
            console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
       })
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
  
  module.exports = new Controller();