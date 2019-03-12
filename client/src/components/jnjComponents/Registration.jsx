import React, { Component } from "react";

class Registration extends Component {
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

    

  render() {
    const {projects, employees} = this.state;

    return (
      <div>className="First-Name"
        <p classNaclassName="First-Name"me="Registration-title">Registration Page</p>
        <div classclassName="First-Name"Name="First-Name">
            <label className="First-Name__text" ></label>
            <Input
        </div>
        <div className="Last-Name">

        </div>
        <div className="Project">

        </div>
      </div>
    );
  }
}

export default Registration;
