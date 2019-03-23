import React, {Component} from "react";
// import {decorate, observable} from "mobx";
import {observer} from "mobx-react";
import {Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

import {AppStore} from '../../AppStore';

import DataTable from "../ReactComponents/DataTable/DataTable";

import M from "../../Messages/messages";

// @observer
class Employees extends Component {
    
    state = {
        AppStore: new AppStore()
    };

    constructor() {
        super();
        this.state = {
            employees: [],
            employee: {
                firstname: '',
                lastname: '',
                vacation_start: '',
                vacation_end: '',
                project: ''
            },
            employeeHeaders: ['First Name', 'Last Name', 'Project'],
            selectedProject: '',
            projects: [],
            emptyEmployee: false
        }
    }

     async componentDidMount() {
        this.getEmployees();
        const e = this.state.employees;
        await this.getProjects();
        const a = this.state.projects;
        this.setState({
            selectedProject: this.state.projects[0].name
        })
    }

    getProjects = async() => {
        const url = 'http://localhost:8081/projects';
        return new Promise((resolve, reject) => {
            return fetch(url)
                .then(response => response.json())
                .then(({data}) => this.setState({projects: data}, () => {
                    return resolve(data);
                }))
                .catch(err => resolve(err));
        });
    }

    getEmployees = () => {
        console.log("getEmployees888888888888888888888");
        const url = 'http://localhost:8081/employees';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.setState({employees: data}))
            .catch(err => console.log(err))
    }

    onEmployeeClick = () => {
        console.log("onEmployeesClick");
    }

    onAddEmployeeClick = () => {
        const {employee, selectedProject} = this.state;
        if(employee.firstname.length === 0 || employee.firstname.length === 0 || selectedProject.length === 0) {
            console.log("You must fill employee's data.");
            this.setState({
                emptyEmployee: true
            })
            return;
        }
        const url = `http://localhost:8081/employees/add?firstname=${employee.firstname}&lastname=${employee.lastname}&project=${selectedProject}`;
        fetch(url,
            {method: "POST"}
            )
            .then(response => response.json())
            .then(this.getEmployees)
            .catch(err => console.log(err))
    }

    onDeleteEmployeeClick = () => {
        const {employee} = this.state;
        const url = `http://localhost:8081/employees/delete?firstname=${employee.firstname}&lastname=${employee.lastname}`;
        fetch(url,
            {method: "DELETE"}
            )
            .then(response => response.json())
            .then(this.getEmployees)
            .catch(err => console.log(err))
    }

    onEmployeeFirstNameChange = (event) => {
        this.setState({
            employee: {
                ...this.state.employee,
                firstname: event.target.value
            }
        });
    }

    onEmployeeLastNameChange = (event) => {
        this.setState({
            employee: {
                ...this.state.employee,
                lastname: event.target.value
            }
        });
    }

    onEmployeeProjectSelect = (event) => {
        this.setState({
            selectedProject:  event.target.value,
            employee: {
                ...this.state.employee,
                project: event.target.value 
            },
        });
    }

    getEmployeesFromSelectedProject = () => {

    }

    render() {
        const {employees, employee, selectedProject, employeeHeaders, projects, emptyEmployee} = this.state;
        return(
            <Grid>
                <Row className="Employees">
                    <Col className="employees-list" sm={6}>
                        <DataTable
                            className="Employees-table"
                            headers={employeeHeaders}
                            items={employees}
                        />
                    </Col>
                    <Col className="Employees__adding" sm={4}>
                        <FormGroup
                            controlId="formBasicText"
                            >
                            <ControlLabel>Add Employee</ControlLabel>
                            <FormControl
                                type="text"
                                value={employee.name}
                                placeholder="Enter employee First name"
                                onChange={this.onEmployeeFirstNameChange}
                            />
                            <FormControl
                                type="text"
                                value={employee.name}
                                placeholder="Enter employee Last name"
                                onChange={this.onEmployeeLastNameChange}
                            />
                            <ControlLabel>Select Project</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select employee's project"
                                onChange={this.onEmployeeProjectSelect}
                                value={this.state.selectedProject}
                            >
                            {projects.map((project, index) =>
                                <option
                                    key = {index}
                                    value={project.name}>
                                    {project.name}
                                </option>
                                )}
                            </FormControl> 
                            {emptyEmployee &&
                                <HelpBlock>{M.emptyEmployee}</HelpBlock>
                            }
                        </FormGroup>
                        <Button onClick={this.onAddEmployeeClick} >Add</Button>
                        <Button onClick={this.onDeleteEmployeeClick} >Delete</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Employees;