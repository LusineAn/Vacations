import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from "prop-types";

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from "react-bootstrap";
import DataTable from "../ReactComponents/DataTable/DataTable";

import M from "../../Messages/messages";

@observer
class Employees extends Component {

    static propTypes = {
        appStore: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            employeeHeaders: ['First Name', 'Last Name', 'Project'],
        }
    }

    onEmployeeFirstNameChange = (event) => {
        const firstname = event.target.value;
        this.props.appStore.setEmployeeFirstName(firstname);
    }

    onEmployeeLastNameChange = (event) => {
        const lastname = event.target.value;
        this.props.appStore.setEmployeeLastName(lastname);
    }

    onEmployeeProjectSelect = (event) => {
        if(!event.target.value.trim()) {
            return
        }
        const selectedProject = event.target.value;
        this.props.appStore.setSelectedProject(selectedProject);
    }

    onAddEmployeeClick = () => {
        this.props.appStore.addEmployee();
    }

    onDeleteEmployeeClick = () => {
        this.props.appStore.deleteEmployee();
    }

    render() {
        const {projects, employees, newEmployee, selectedProject, emptyEmployee, isEmployeeNonUnique} = this.props.appStore;
        const {employeeHeaders} = this.state;
        const employeesList = employees.map(employee => {
            const simpleEmployee = {
                firstname: employee.firstname,
                lastname: employee.lastname,
                project: employee.name
            };
            return simpleEmployee;
        })
        return(
            <Grid>
                <Row className="employees">
                    <Col className="employees-list" sm={6}>
                        <DataTable
                            className="employees-table"
                            headers={employeeHeaders}
                            items={employeesList}
                        />
                    </Col>
                    <Col className="employees__adding" sm={6}>
                        <FormGroup
                            controlId="formBasicText"
                            >
                            <ControlLabel>{M.addEmployee}</ControlLabel>
                            <FormControl
                                type="text"
                                value={newEmployee.firstname}
                                placeholder={M.firstnamePlaceholder}
                                onChange={this.onEmployeeFirstNameChange}
                            />
                            <FormControl
                                type="text"
                                value={newEmployee.lastname}
                                placeholder={M.lastnamePlaceholder}
                                onChange={this.onEmployeeLastNameChange}
                            />
                            <ControlLabel>{M.selectProject}</ControlLabel>
                            <FormControl
                                componentClass="select"
                                onChange={this.onEmployeeProjectSelect}
                                value={selectedProject}
                            >
                            <option value="">{M.selectProject}</option>
                            {projects.map((project, index) =>
                                <option
                                    key = {index}
                                    value={project.name}>
                                    {project.name}
                                </option>
                                )}
                            </FormControl>
                            {emptyEmployee &&
                                <HelpBlock className="empty-warning">{M.emptyEmployee}</HelpBlock>
                            }
                            {isEmployeeNonUnique &&
                                <HelpBlock className="unique-warning">{M.nonUniqueEmployee}</HelpBlock>
                            }
                        </FormGroup>
                        <div className="formControl-actions">
                            <Button className="add-button" onClick={this.onAddEmployeeClick} >Add</Button>
                            <Button className="delete-button" onClick={this.onDeleteEmployeeClick} >Delete</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Employees;