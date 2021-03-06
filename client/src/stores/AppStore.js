import Immutable from 'immutable';
import {extendObservable, action} from 'mobx';
import moment from 'moment';

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
            newEmployee: {
                firstname: '',
                lastname: '',
                project: '',
                vacation_start: '',
                vacation_end: ''
            },
            selectedEmployee: {
                employee_id: '',
                project_id: '',
                firstname: '',
                lastname: '',
                project: '',
                start_date: '',
                end_date: ''
            },
            selectedProject: '',
            emptyProject: false,
            emptyEmployee: false,
            isProjectNonUnique: false,
            isEmployeeNonUnique: false,
            isVacationsIntersect: false
        };
    };

    @action
    loadData = () => {
        this.loadProjects();
        this.loadEmployees();
        this.loadVacations();
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
    setSelectedEmployee(selectedEmployee) {
        this.selectedEmployee = Object.assign({}, selectedEmployee);
    }

    @action
    setEmployeeFirstName(firstname) {
        this.newEmployee.firstname = firstname;
    }

    @action
    setEmployeeLastName(lastname) {
        this.newEmployee.lastname = lastname;
    }

    setVacationStartDate(startDate) {
        this.selectedEmployee.start_date = moment(startDate).format('MM/DD/YYYY');
    }

    setVacationEndDate(endDate) {
        if(endDate) {
            this.selectedEmployee.end_date = moment(endDate).format('MM/DD/YYYY');
            this.addEmployeeVacation();
            return;
        }
        this.selectedEmployee.end_date = endDate;
    }

    setIsVacationsIntersect(intersect) {
        this.isVacationsIntersect = intersect;
    }

    @action
    resetProjectData() {
        this.project.name = '';
    }

    @action
    resetEmployeeData() {
        this.selectedProject = '';
        this.newEmployee.firstname = '';
        this.newEmployee.lastname = '';
    }

    @action
    resetVacationData() {
        this.selectedEmployee = {};
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

        const firstname = this.newEmployee.firstname.trim();
        const lastname = this.newEmployee.lastname.trim();
        const selectedProject = this.selectedProject;

        if(firstname.length === 0 ||
        lastname.length === 0 || selectedProject.length === 0) {
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
    addEmployeeVacation() {
        const employee_id = this.selectedEmployee.employee_id;
        const project_id = this.selectedEmployee.project_id;
        const start_date = this.selectedEmployee.start_date;
        const end_date = this.selectedEmployee.end_date;

        this.checkEmployeeVacation(this.selectedEmployee);
        if(this.isVacationsIntersect || !employee_id || !project_id) {
            return;
        }

        const url = `http://localhost:8081/vacations/update?employee_id=${employee_id}
                    &project_id=${project_id}&start_date=${start_date}&end_date=${end_date}`;
        fetch(url, {method: "PUT"} )
            .then(response => {
                return response.json()})
                .then(() => this.loadVacations())
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
        const {firstname, lastname} = this.newEmployee;
        const url = `http://localhost:8081/employees/delete?firstname=${firstname}&lastname=${lastname}`;
        fetch(url, {method: "DELETE"})
            .then(response => response.json())
            .then(() => {this.loadEmployees()})
            .then(() => this.resetEmployeeData())
            .catch(err => console.log(err))
    }

    getFilteredEmployees(project) {
        const filteredEmployees = this.vacations.filter(employee => employee.name === project);
        return filteredEmployees;
    }

    checkEmployeeVacation(employee) {
        const employeeProject = employee.name;
        const filteredEmployees = this.getFilteredEmployees(employeeProject);
        const employeeStartDate = moment(employee.start_date);
        const employeeEndDate = moment(employee.end_date);

        this.isVacationsIntersect = false;
        this.isVacationsIntersect = !!filteredEmployees.find(filteredEmployee => {
            if(filteredEmployee.employee_id === employee.employee_id) {
                return false;
            }
            const filteredEmployeeStartDate = moment(new Date(filteredEmployee.start_date)).format('MM/DD/YYYY');
            const filteredEmployeeEndDate = moment(new Date(filteredEmployee.end_date)).format('MM/DD/YYYY');
            return (
                (
                    employeeStartDate.isSameOrBefore(filteredEmployeeStartDate) &&
                    employeeEndDate.isSameOrAfter(filteredEmployeeStartDate)
                ) ||
                (
                    employeeStartDate.isSameOrAfter(filteredEmployeeStartDate) &&
                    employeeStartDate.isSameOrBefore(filteredEmployeeEndDate)
                )
            )});
    }
}

export {AppStore};