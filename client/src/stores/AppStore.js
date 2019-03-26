import Immutable from 'immutable';
import {extendObservable, action, computed, runInAction, toJS} from 'mobx';
// import _ from 'lodash';

class AppStore {

    constructor() {
        extendObservable(this, this.getDefaultStoreProps());
    }

    getDefaultStoreProps() {
        return {
            projects: Immutable.List(),
            selectedProject: '',
            project: Immutable.Map(),
            employees: Immutable.List(),
            selectedEmployee: Immutable.Map(),
            emptyProject: false,
            emptyEmployee: false,
            isProjectNonUnique: false,
            isEmployeeNonUnique: false,
            employee: {
                firstname: '',
                lastname: '',
                vacation_start: '',
                vacation_end: '',
                project: ''
            },
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
            .then(response => {
                return response.json()})
            .then(({data}) => {
                return this.setEmployees(data)})
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
    setProject(project) {
        this.project = project;
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
    resetData() {
        this.selectedProject = '';
        this.firstname = '';
        this.lastname = '';
        this.emptyEmployee = false;
        this.isEmployeeNonUnique = false;
    }

    @action
    addEmployee() {
        const {firstname, lastname} = this.employee;
        const selectedProject = this.selectedProject;
        this.emptyEmployee = false;
        this.isEmployeeNonUnique = false;

        if(firstname.length === 0 || lastname.length === 0 || selectedProject.length === 0) {
            this.emptyEmployee = true
            return;
        }
        this.isEmployeeNonUnique = !!this.employees.find(employee => {
            return (employee.firstname === firstname && employee.lastname === lastname)
        });
        if(this.isEmployeeNonUnique) {
            return;
        }

        const url = `http://localhost:8081/employees/add?firstname=${firstname}&lastname=${lastname}&project=${selectedProject}`;
        fetch(url, {method: "POST"} )
            .then(response => {
                return response.json()})
                .then(() => this.loadData())
                .then(() => this.resetData())
                .catch(err => console.log(err));
    }

    @action
    deleteEmployee() {
        const {firstname, lastname} = this.employee;
        const url = `http://localhost:8081/employees/delete?firstname=${firstname}&lastname=${lastname}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(() => {this.loadData()})
            .catch(err => console.log(err))
    }

    @action
    addProject(newProject) {
        const projectName = newProject.name;
        if(projectName.length === 0) {
            this.emptyProject = true
            return;
        }
        this.isProjectNonUnique = this.projects.map(project => project.name = projectName);
        if(isProjectNonUnique) {
            return;
        }

        const url = `http://localhost:8081/projects/add?project_name=${project.name}`;
        fetch(url, {method: "POST"})
            .then(response => response.json())
            .then(() => {this.loadData()})
            .catch(err => console.log(err));
        
        this.emptyProject = false;
        this.isProjectNonUnique = false;
        this.project = '';
    }

    @action
    deleteProject(project) {
        const url = `http://localhost:8081/projects/delete?project_name=${project.name}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(() => {this.loadData()})
            .catch(err => console.log(err));
        this.project = '';
    }
}

export {AppStore};