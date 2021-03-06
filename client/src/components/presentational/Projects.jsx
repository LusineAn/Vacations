import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from "prop-types";

import {Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from "react-bootstrap";
import DataTable from "../ReactComponents/DataTable/DataTable";

import M from "../../Messages/messages";

@observer
class Projects extends Component {
    
    static propTypes = {
        appStore: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            projecteHeaders: ['Project Name'],
        }
    }

    onProjectNameChange = (event) => {
        const projectName = event.target.value;
        this.props.appStore.setProject(projectName);
    }

    onAddProjectClick = () => {
        this.props.appStore.addProject();
    }

    onDeleteProjectClick = () => {
        this.props.appStore.deleteProject();
    }

    render() {
        const {projects, project, emptyProject, isProjectNonUnique} = this.props.appStore;
        const projectHeaders = ['Project Name'];

        return(
            <Grid>
                <Row className="projects">
                    <Col className="projects-list" sm={6}>
                        <DataTable
                            className="projects-list"
                            headers={projectHeaders}
                            items={projects}
                        />
                    </Col>
                    <Col className="projects__adding" sm={4} smOffset={2}>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>{M.addProject}</ControlLabel>
                            <Form inline>
                                <FormControl
                                    type="text"
                                    value={project.name}
                                    placeholder={M.projectNamePlaceholder}
                                    onChange={this.onProjectNameChange}
                                />
                                <Button onClick={this.onAddProjectClick}>Add</Button>
                            </Form>
                            <FormControl.Feedback />
                            {(emptyProject || isProjectNonUnique) &&
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