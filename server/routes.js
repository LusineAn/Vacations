const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/', controller.home);
router.get('/projects', controller.getProjects);
router.post('/projects/add', controller.addProject);
router.delete('/projects/delete', controller.deleteProject);
router.put('/projects/update', controller.updateProject);
router.get('/employees', controller.getEmployees);
router.post('/employees/add', controller.addEmployee);
router.delete('/employees/delete', controller.deleteEmployee);
router.get('/vacations', controller.getVacations);

module.exports = router;