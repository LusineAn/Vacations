import React, { Component } from "react";
import {Button} from 'react-bootstrap';

import Navbar from "../presentational/NavBar.jsx"
import Employees from "../presentational/Employees.jsx"

class UsersData extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      employees: []
    };
  }

    componentDidMount() {
        this.getProjects();
        this.getEmployees();
    }

    getProjects = () => {
        const url = 'http://localhost:8081/projects';
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({projects: response.data}))
            .catch(err => console.error(err))
    }

    getEmployees = () => {
      const url = 'http://localhost:8081/employees';
      fetch(url)
          .then(response => response.json())
          .then(response => this.setState({employees: response.data}))
          .catch(err => console.error(err))
    }

  render() {
    const {projects, employees} = this.state;

    return (
      <div>
        <Button type="primary">Hello</Button>
       <Navbar></Navbar>
       <Employees/>
        <div>
          {projects.map(project => 
            <div key={project.project_id}>{project.project_name}</div>
          )}
        </div>
        <div>
          {employees.map(employee => 
            <div key={employee.employee_id}>{employee.employee_first_name} {employee.employee_last_name}</div>
          )}
        </div>
      </div>
    );
  }
}

export default UsersData;
