const express = require('express');
const router = express.Router();
const employeesController = require('./Controller/employeesController');
const projectsController = require('./Controller/projectsController');
const vacationsController = require('./Controller/vacationsController');

router.get('/', vacationsController.home);
router.get('/projects', projectsController.getProjects);
router.post('/projects/add', projectsController.addProject);
router.delete('/projects/delete', projectsController.deleteProject);
router.put('/projects/update', projectsController.updateProject);
router.get('/employees', employeesController.getEmployees);
router.post('/employees/add', employeesController.addEmployee);
router.delete('/employees/delete', employeesController.deleteEmployee);
router.get('/vacations', vacationsController.getVacations);

module.exports = router;