import React, { Component } from "react";

import {Table} from 'react-bootstrap';

class Employees extends Component {

    constructor() {
        super();
        this.state = {
            employees: []
          };
    }

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
      const url = 'http://localhost:8081/employees';
      fetch(url)
          .then(response => response.json())
          .then(response => this.setState({employees: response.data}))
          .catch(err => console.error(err))
    }

    onEmployeeClick = () => {
        //store-um active employee-n dnel nshvacy
    }

    render() {
        const employees = this.state.employees;
        return(
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Vacation Start</th>
                    <th>Vacation End</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee, index) => {
                        <tr key={index} onClick={this.onEmployeeClick}>
                            <td>employee.firstname</td>
                            <td>employee.lastname</td>
                            <td>employee.startVacation</td>
                            <td>employee.endVacation</td>
                        </tr>
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default Employees;