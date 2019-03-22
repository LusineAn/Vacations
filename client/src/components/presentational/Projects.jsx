import React, {Component} from "react";
import {Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

// import DataTable from "../ReactComponents/DataTable/DataTable";

import M from '../../Messages/messages';

class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            project: {
                name: ''
            }
        }
    }

    componentWillMount() {
        this.getProjects();
    }

    getProjects = () => {
        const url = 'http://localhost:8081/projects';
        fetch(url)
            .then(response => response.json())
            .then(({data}) => this.setState({projects: data}))
            .catch(err => console.log(err))
    }

    onProjectClick = () => {
        console.log("onProjectsClick");
    }

    onAddProjectClick = () => {
        const {project} = this.state;
        const url = `http://localhost:8081/projects/add?project_name=${project.name}`;
        fetch(url,
            {method: "POST"}
            )
            // .then(response => response.json())
            .then(this.getProjects)
            .catch(err => console.log(err))
    }

    onDeleteProjectClick = () => {
        const {project} = this.state;
        const url = `http://localhost:8081/projects/delete?project_name=${project.name}`;
        fetch(url,
            {method: "DELETE"}
            )
            .then(response => response.json())
            .then(this.getProjects)
            .catch(err => console.log(err))
    }

    onProjectNameChange = (event) => {
        this.setState({
            project: {
                // ...this.state.project,
                name: event.target.value
            }
        });
    }

    render() {
        const {projects, project} = this.state;
        const headers = ['number', 'Project Name'];

        return(
            <Grid>
                <Row className="Projects">
                    <Col className="Projects-list" sm={6}>
                        <DataTable
                            className="Projects-list123"
                            headers={headers}
                            items={projects}
                        />
                    </Col>
                    <Col className="Projects__adding" sm={4} smOffset={2}>
                        <FormGroup
                            controlId="formBasicText"
                            // validationState={this.getValidationState()}
                            >
                            <ControlLabel>{M.addProject}</ControlLabel>
                            <Form inline>
                                <FormControl
                                    type="text"
                                    value={project.name}
                                    placeholder="Enter project name"
                                    onChange={this.onProjectNameChange}
                                />
                                <Button onClick={this.onAddProjectClick}>Add</Button>
                            </Form>
                            <FormControl.Feedback />
                            <HelpBlock>Project name must be unique.</HelpBlock>
                        </FormGroup>
                        <Button onClick={this.onDeleteProjectClick} >Delete</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Projects;