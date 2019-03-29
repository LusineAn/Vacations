import Immutable from 'immutable';
import {extendObservable, action, computed, runInAction, toJS} from 'mobx';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
// import _ from 'lodash';

class AppStore {

    constructor() {
        extendObservable(this, this.getDefaultStoreProps());
    }

    getDefaultStoreProps() {
        return {
            projects: Immutable.List(),
            employees: Immutable.List(),
            vacations: Immutable.List(),
            project: {
                name: ''
            },
            employee: {
                firstname: '',
                lastname: '',
                project: '',
                vacation_start: '',
                vacation_end: '',
            },
            // vacations: {
            //         firstname: '',
            //         lastname: '',
            //         vacation_start: '',
            //         vacation_end: '',
            //         project: ''
            // },
            selectedProject: '',
            emptyProject: false,
            emptyEmployee: false,
            isProjectNonUnique: false,
            isEmployeeNonUnique: false
        };
    };

    @action
    loadData = async () => {
        await this.loadProjects();
        await this.loadEmployees();
    };

    @action
    loadProjects = () => {
        const url = 'http://localhost:8081/projects';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.setProjects(data))
            .catch(err => resolve(err));
    }

    @action
    loadEmployees = () => {
        const url = 'http://localhost:8081/employees';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.setEmployees(data))
            .catch(err => resolve(err));
    }

    @action
    loadVacations = () => {
        const url = 'http://localhost:8081/vacations';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.setVacations(data))
            .catch(err => resolve(err));
    }

    @action
    setProjects = (projects) => {
        this.projects = projects;
    };

    @action
    setEmployees = (employees) => {
        this.employees = employees;
    };

    @action
    setVacations = (vacations) => {
        this.vacations = vacations;
    };

    @action
    setProject(projectName) {
        this.project.name = projectName;
    }

    @action
    setSelectedProject(selectedProject) {
        this.selectedProject = selectedProject;
    }

    @action
    setEmployeeFirstName(firstname) {
        this.employee.firstname = firstname;
    }

    @action
    setEmployeeLastName(lastname) {
        this.employee.lastname = lastname;
    }

    @action
    setVacationStartDay(startDay) {
        this.employee.vacation_start = startDay;
        this.employee.vacation_end = null;
    }

    @action
    setVacationEndDay(endDay) {
        this.employee.vacation_end = endDay;
    }

    @action
    resetProjectData() {
        this.project.name = '';
    }

    @action
    resetEmployeeData() {
        this.selectedProject = '';
        this.employee.firstname = '';
        this.employee.lastname = '';
    }

    @action
    addProject() {
        this.emptyProject = false;
        this.isProjectNonUnique = false;

        const projectName = this.project.name;
        if(projectName.trim().length === 0) {
            this.emptyProject = true
            return;
        }

        this.isProjectNonUnique = !!this.projects.find(project => {
            return project.name === projectName
        });
        if(this.isProjectNonUnique) {
            return;
        }

        const url = `http://localhost:8081/projects/add?project_name=${projectName}`;
        fetch(url, {method: "POST"})
            .then(response => {return response.json()})
            .then(() => {this.loadProjects()})
            .then(() => this.resetProjectData())
            .catch(err => console.log(err));
    }

    @action
    addEmployee() {
        this.emptyEmployee = false;
        this.isEmployeeNonUnique = false;

        const {firstname, lastname} = this.employee;
        const selectedProject = this.selectedProject;

        if(firstname.trim().length === 0 ||
        lastname.trim().length === 0 || selectedProject.length === 0) {
            this.emptyEmployee = true
            return;
        }

        this.isEmployeeNonUnique = !!this.employees.find(employee => {
            return (employee.firstname === firstname && employee.lastname === lastname)
        });
        if(this.isEmployeeNonUnique) {
            return;
        }

        const url = `http://localhost:8081/employees/add?firstname=${firstname}
                    &lastname=${lastname}&project=${selectedProject}`;
        fetch(url, {method: "POST"} )
            .then(response => {
                return response.json()})
                .then(() => this.loadEmployees())
                .then(() => this.resetEmployeeData())
                .catch(err => console.log(err));
    }

    @action
    deleteProject() {
        const projectName = this.project.name;
        const url = `http://localhost:8081/projects/delete?project_name=${projectName}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(() => {this.loadProjects()})
            .then(() => this.resetProjectData())
            .catch(err => console.log(err));
    }

    @action
    deleteEmployee() {
        const {firstname, lastname} = this.employee;
        const url = `http://localhost:8081/employees/delete?firstname=${firstname}&lastname=${lastname}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(() => {this.loadEmployees()})
            .then(() => this.resetEmployeeData())
            .catch(err => console.log(err))
    }
}

export {AppStore};