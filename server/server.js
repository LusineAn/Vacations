const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const allProjects = 'SELECT * FROM project';
const allEmployees = 'SELECT * FROM employee';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vacations'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.get('/', (req, res) => {
   res.send('Go to /projects to see projects or go to /employee to see employees');
})

app.get('/projects', function (req, res) {
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
     const insertProject = `INSERT INTO project (project_name) VALUES('${name}')`;
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
    const deleteProject = `DELETE FROM project WHERE project_name = '${name}'`;
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
    const updateProject = `UPDATE project SET project_name = '${newName}' WHERE project_name = '${oldName}'`;
   connection.query(updateProject, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Project '${name}' successfully updated`);
       }
   })
});

 app.get('/employees', function (req, res) {
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
    const {firstname, lastname} = req.query;
    const insertEmployees = `INSERT INTO employee (employee_first_name, employee_last_name) VALUES('${firstname}', '${lastname}')`;
    connection.query(insertEmployees, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Employee '${firstname}', '${lastname}' successfully added`);
       }
   })
});

app.get('/employees/delete', function (req, res) {
    const {firstname, lastname} = req.query;
    console.log('first-lastname: -------- : ', firstname, lastname);
    const deleteEmployee = `DELETE FROM employee WHERE (employee_first_name = '${firstname}' AND employee_last_name = '${lastname}')`;
    connection.query(deleteEmployee, (err, results) => {
       if(err) {
           return res.send(err);
       } else {
        console.log(`Employee '${firstname}', '${lastname}' successfully deleted`);
       }
   })
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
