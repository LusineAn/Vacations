import React, {Component} from "react";
import {observer} from "mobx-react";

import {Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

@observer
class Employees extends Component {
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
            selectedProject: ''
        }
    }

    componentDidMount() {
        this.getEmployees();
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
        const {employee} = this.state;
        const url = `http://localhost:8081/employees/add?firstname=${employee.firstname}&lastname=${employee.lastname}&project=${employee.project}`;
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
        const {employees, employee, selectedProject} = this.state;

        return(
            <Grid>
                <Row className="Employees">
                    <Col className="Employees-list" sm={6}>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Vacation's start date</th>
                                    <th>Vacation's end date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={employee.id} onClick={this.onEmployeeClick}>
                                        <td>{index + 1}</td>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.vacation_start ? employee.vacation_start : '-'}</td>
                                        <td>{employee.vacation_end ? employee.vacation_end : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col className="Employees__adding" sm={4}>
                        <FormGroup
                            controlId="formBasicText"
                            // validationState={this.getValidationState()}
                            >
                            <ControlLabel>Add Employee</ControlLabel>
                            {/* <Form inline> */}
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
                                <FormControl
                                    type="text"
                                    value={selectedProject}
                                    placeholder="Select employee's project"
                                    onChange={this.onEmployeeProjectSelect}
                                />
                            {/* </Form> */}
                            <FormControl.Feedback />
                            <HelpBlock>Employee name must be unique.</HelpBlock>
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