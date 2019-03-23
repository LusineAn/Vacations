import Immutable from 'immutable';
import {extendObservable, action, computed} from 'mobx';
// import _ from 'lodash';

class AppStore {

    constructor() {
        extendObservable(this, this.getDefaultStoreProps());
    }

    getDefaultStoreProps() {
        return {
            projects: Immutable.List(),
            selectedProject: Immutable.Map(),
            project: Immutable.Map(),
            employees: Immutable.List(),
            selectedEmployee: Immutable.Map(),
            emptyProject: false,
            emptyEmployee: false,
            isProjectNonUnique: true,
            isEmployeeNonUnique: false
        };
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

    validateEmployee(firstname, lastname) {
        this.isEmployeeUnique = !this.employees.map(employee => {
            employee.firstname === firstname && employee.lastname === lastname
        });
        if(isProjectUnique) {
            this.project = project;
        } else {
            return
        }
    }

    @action
    resetData() {
        this.selectedProject = '';
        this.firstname = '';
        this.lastname = '';
    }

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
            .then(this.getProjects)
            .catch(err => console.log(err));
        
        this.emptyProject = false;
        this.isProjectNonUnique = false;
        this.project = '';
    }

    deleteProject(project) {
        const url = `http://localhost:8081/projects/delete?project_name=${project.name}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(this.getProjects)
            .catch(err => console.log(err));
        this.project = '';
    }

    addEmployee(newEmployee, selectedProject) {
        const {firstname, lastname} = newEmployee;
        if(firstname.length === 0 || lastname.length === 0 || selectedProject.length === 0) {
            this.emptyEmployee = true
            return;
        }
        this.isEmployeeNonUnique = this.employees.map(employee => {
            employee.firstname === firstname && employee.lastname === lastname
        });
        if(isEmployeeNonUnique) {
            return;
        }

        const url = `http://localhost:8081/employees/add?firstname=${employee.firstname}&lastname=${employee.lastname}&project=${selectedProject}`;
        fetch(url, {method: "POST"} )
            .then(response => response.json())
            .then(this.getEmployees)
            .catch(err => console.log(err));
        
        this.emptyEmployee = false;
        this.isEmployeeNonUnique = false;
        this.resetData();
    }

    deleteEmployee(employee) {
        const url = `http://localhost:8081/employees/delete?firstname=${employee.firstname}&lastname=${employee.lastname}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(this.getEmployees)
            .catch(err => console.log(err))
    }

    @computed
    get getProjects() {
        const url = 'http://localhost:8081/projects';
        return new Promise((resolve, reject) => {
            return fetch(url)
                .then(response => response.json())
                .then(({data}) => this.projects = data)
                .catch(err => resolve(err));
        });
    }

    @computed
    // get getEmployees = () => {
    get getEmployees() {
        console.log("getEmployees88888888888");
        const url = 'http://localhost:8081/employees';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.employees = data)
            .catch(err => console.log(err))
    }
}

export {AppStore};