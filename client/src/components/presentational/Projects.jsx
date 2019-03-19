import React, {Component} from "react";
import {observer} from "mobx-react";

import {Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

@observer
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

    componentDidMount() {
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

        return(
            <Grid>
                <Row className="Projects">
                    <Col className="Projects-list" sm={6}>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={project.id} onClick={this.onProjectClick}>
                                        <td>{index + 1}</td>
                                        <td>{project.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col className="Projects__adding" sm={4} smOffset={2}>
                        <FormGroup
                            controlId="formBasicText"
                            // validationState={this.getValidationState()}
                            >
                            <ControlLabel>Add Project</ControlLabel>
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