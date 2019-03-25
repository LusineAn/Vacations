import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {decorate, observable} from "mobx";

import {Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";

import {AppStore} from '../../stores/AppStore';

import M from '../../Messages/messages';

@observer
class Projects extends Component {
    
    static propTypes = {
        appStore: PropTypes.any
    };

    onAddProjectClick = () => {
        const store = this.props.appStore;
        store.addProject(store.project);
    }

    onDeleteProjectClick = () => {
        const store = this.props.appStore;
        store.deleteProject(store.project);
    }

    onProjectNameChange = (event) => {
        const projectName = event.target.value;
        this.props.appStore.setProject(projectName);
    }

    render() {
        const {projects, project, emptyProject, isProjectUnique} = this.props.appStore;
        const projectHeaders = ['Project Name'];

        return(
            <Grid>
                <Row className="Projects">
                    <Col className="Projects-list" sm={6}>
                        <DataTable
                            className="Projects-list123"
                            headers={projectHeaders}
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