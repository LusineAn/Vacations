import React, {Component} from "react";
import {observer} from "mobx-react";

import {Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";

import {AppStore} from '../../stores/AppStore';

import M from '../../Messages/messages';

@observer
class Projects extends Component {
    constructor() {
        super();
        this.state = {
            AppStore: new AppStore()
        }
    }

    componentDidMount() {
        this.state.AppStore.getProjects();
    }

    onAddProjectClick = () => {
        const store = this.state.AppStore;
        store.addProject(store.project);
    }

    onDeleteProjectClick = () => {
        const store = this.state.AppStore;
        store.deleteProject(store.project);
    }

    onProjectNameChange = (event) => {
        const projectName = event.target.value;
        this.state.AppStore.setProject(projectName);
    }

    render() {
        const {projects, project, emptyProject, isProjectUnique} = this.state.AppStore;
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
                        <FormGroup controlId="formBasicText">
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
                            {emptyProject || !isProjectUnique &&
                                <HelpBlock>{emptyProject ? M.emptyProject :
                                    M.nonUniqueProject}</HelpBlock>
                            }
                        </FormGroup>
                        <Button onClick={this.onDeleteProjectClick} >Delete</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Projects;