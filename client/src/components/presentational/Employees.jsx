import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {decorate, observable} from "mobx";

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";

import {AppStore} from '../../stores/AppStore';

import M from "../../Messages/messages";

@observer
class Employees extends Component {

    static propTypes = {
        appStore: PropTypes.any
    };

    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            selectedProject: '',
            employees: [],
            employee: {
                firstname: '',
                lastname: '',
                vacation_start: '',
                vacation_end: '',
                project: ''
            },
            employeeHeaders: ['First Name', 'Last Name', 'Project'],
            // projects: this.props.appStore.projects,
            emptyEmployee: false
        }
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
        const employee = {firstname: this.state.firstname,
        lastname: this.state.lastname};
        const selectedProject = this.state.selectedProject;
        this.props.appStore.addEmployee(employee, selectedProject);
    }

    onDeleteEmployeeClick = () => {
        const employee = {firstname: this.state.firstname,
            lastname: this.state.lastname};
        this.props.appStore.deleteEmployee(employee);
    }

    onEmployeeFirstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
        // const firstname = event.target.value;
        // this.props.appStore.setEmployeeFirstName(firstname);
    }

    onEmployeeLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        });
        // const lastname = event.target.value;
        // this.props.appStore.setEmployeeLastName(lastname);
    }

    onEmployeeProjectSelect = (event) => {
        this.setState({
            selectedProject: event.target.value
        });
        // const selectedProject = event.target.value;
        // this.props.appStore.setSelectedProject(selectedProject);
    }

    getEmployeesFromSelectedProject = () => {

    }

    render() {
        const {employees, projects, employee, 
            emptyEmployee, isEmployeeNonUnique} = this.props.appStore;
        const {employeeHeaders, firstname, lastname, selectedProject} = this.state;
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
                                value={firstname}
                                placeholder={M.firstnamePlaceholder}
                                onChange={this.onEmployeeFirstNameChange}
                            />
                            <FormControl
                                type="text"
                                value={lastname}
                                placeholder={M.lastnamePlaceholder}
                                onChange={this.onEmployeeLastNameChange}
                            />
                            <ControlLabel>{M.selectProject}</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder={M.selectProjectPlaceholder}
                                onChange={this.onEmployeeProjectSelect}
                                value={selectedProject}
                            >
                            {projects.map((project, index) =>
                                <option
                                    key = {index}
                                    value={project.name}>
                                    {project.name}
                                </option>
                                )}
                            </FormControl> 
                            {emptyEmployee || isEmployeeNonUnique &&
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