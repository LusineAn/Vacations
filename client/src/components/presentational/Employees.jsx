import React, {Component} from "react";
import {decorate, observable} from "mobx";
import {observer} from "mobx-react";
import Immutable from 'immutable';

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";

import {AppStore} from '../../stores/AppStore';

import M from "../../Messages/messages";

@observer
class Employees extends Component {
    
    state = {
        AppStore: new AppStore()
    };

    constructor() {
        super();
        this.state = {
            AppStore: new AppStore(),
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
            // projects: this.state.AppStore.projects,
            emptyEmployee: false
        }
    }

    async componentDidMount() {
        const store = this.state.AppStore;
        store.getEmployees();
        await store.getProjects();
        store.setSelectedProject(store.projects[0].name);
    }

    // getProjects = async() => {
    //     const url = 'http://localhost:8081/projects';
    //     return new Promise((resolve, reject) => {
    //         return fetch(url)
    //             .then(response => response.json())
    //             .then(({data}) => this.setState({projects: data}, () => {
    //                 return resolve(data);
    //             }))
    //             .catch(err => resolve(err));
    //     });
    // }

    onAddEmployeeClick = () => {
        const {employee, selectedProject} = this.state;
        this.state.store.addEmployee(employee, selectedProject);
    }

    onDeleteEmployeeClick = () => {
        const {employee} = this.state;
        this.state.store.deleteEmployee(employee);
    }

    onEmployeeFirstNameChange = (event) => {
        const firstname = event.target.value;
        this.state.store.setEmployeeFirstName(firstname);
    }

    onEmployeeLastNameChange = (event) => {
        const lastname = event.target.value;
        this.state.store.setEmployeeLastName(lastname);
    }

    onEmployeeProjectSelect = (event) => {
        const selectedProject = event.target.value;
        this.state.AppStore.setSelectedProject(selectedProject);
    }

    getEmployeesFromSelectedProject = () => {

    }

    render() {
        const {employees, projects, employee, selectedProject, emptyEmployee} = this.state.AppStore;
        const {employeeHeaders} = this.state;
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
                            <ControlLabel>{M.addEmployee}</ControlLabel>
                            <FormControl
                                type="text"
                                value={employee.firstname}
                                placeholder={M.firstnamePlaceholder}
                                onChange={this.onEmployeeFirstNameChange}
                            />
                            <FormControl
                                type="text"
                                value={employee.lastname}
                                placeholder={M.lastnamePlaceholder}
                                onChange={this.onEmployeeLastNameChange}
                            />
                            <ControlLabel>{M.selectProject}</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder={M.selectProjectPlaceholder}
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
                            {emptyProject || isEmployeeNonUnique &&
                                <HelpBlock>{emptyEmployee ? M.emptyEmployee :
                                    M.nonUniqueEmployee}</HelpBlock>
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