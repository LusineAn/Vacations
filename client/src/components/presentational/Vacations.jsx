import React, {Component} from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";

import M from "../../Messages/messages";

@observer
class Vacations extends Component {

    static propTypes = {
        appStore: PropTypes.any
    };

    constructor() {
        super();
        this.state = {
            vacationHeaders: ['Project', 'First Name', 'Last Name', 'Vacation Start', 'Vacation End'],
        }
    }

    async componentDidMount() {
        this.props.appStore.loadVacations();
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
        const {projects, employees, employee, selectedProject, emptyEmployee, isEmployeeNonUnique, vacations} = this.props.appStore;
        const {vacationHeaders} = this.state;
        return(
            <Grid>
                <Row className="vacations">
                    <Col className="vacations-list" sm={6}>
                        <DataTable
                            className="vacations-table"
                            headers={vacationHeaders}
                            items={vacations}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;