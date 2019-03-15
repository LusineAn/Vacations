const express = require('express');
const cors = require('cors');

const connection = require('./database')

const app = express();
const port = 8081;
app.use(cors());

app.get('/', (req, res) => {
   res.send('Go to /projects to see projects or go to /employee to see employees');
})

app.get('/projects', function (req, res) {
    const allProjects = 'SELECT * FROM projects';
    connection.query(allProjects, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
 });

app.get('/projects/add', function (req, res) {
     const {name} = req.query;
     console.log('req.query: -------- : ', name);
     const insertProject = `INSERT INTO projects (name) VALUES('${name}')`;
    connection.query(insertProject, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            console.log(`Project '${name}' successfully added`);
        }
    })
 });

app.get('/projects/delete', function (req, res) {
    const {name} = req.query;
    console.log('req.query: -------- : ', name);
    const deleteProject = `DELETE FROM projects WHERE name = '${name}'`;
    connection.query(deleteProject, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
          console.log(`Project '${name}' successfully deleted`);
       }
   })
});

app.get('/projects/update', function (req, res) {
    const {newName} = req.query;
    const {oldName} = req.name;
    console.log('req.query: -------- : ', name);
    const updateProject = `UPDATE projects SET name = '${newName}' WHERE name = '${oldName}'`;
    connection.query(updateProject, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Project '${name}' successfully updated`);
       }
   })
});

app.get('/employees', function (req, res) {
    const allEmployees = 'SELECT * FROM employees';
    connection.query(allEmployees, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/employees/add', function (req, res) {
    const {firstname, lastname, project} = req.query;
    const insertToEmployees = `INSERT INTO employees (firstname, lastname) VALUES('${firstname}', '${lastname}')`;
    
    
    connection.query(insertToEmployees, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Employee '${firstname}', '${lastname}' successfully added`);




    const employeeId = `SELECT id FROM employees WHERE
                       employees.firstname = '${firstname}' AND
                       employees.lastname = '${lastname}'`;
    const projectId = `SELECT id FROM projects WHERE projects.name = '${project}`;

    const insertToProjectsEmployees = `INSERT INTO vacations (project_id, employee_id) 
                                      VALUES ('${projectId}','${employeeId}')`;

    
    console.log(`employeeId:  '${employeeId}'`);
    console.log(`projectId:  '${projectId}'`);

    connection.query(insertToProjectsEmployees, (err, results) => {
        if(err) {
            console.log(`Employee '${firstname}', '${lastname}', '${project}' error to adding in vacations table`);
            console.log(err);
            return res.send(err);
        } else {
            console.log(`Employee '${firstname}', '${lastname}', '${project}' successfully added to vacations table`);
        }
    });


       }
    });
    
});

app.get('/employees/delete', function (req, res) {
    const {firstname, lastname} = req.query;
    console.log('first-lastname: -------- : ', firstname, lastname);
    const deleteEmployee = `DELETE FROM employees WHERE (firstname = '${firstname}' AND lastname = '${lastname}')`;
    connection.query(deleteEmployee, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
       }
   })
});

app.get('/projects/employees', function (req, res) {
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
       } else {
        console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
       }
   })
});

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
})
