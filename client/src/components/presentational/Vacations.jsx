import React from "react";
import {observer, toJS} from "mobx-react";
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";
import DatePickerInput from "../ReactComponents/DatePickerInput";

import M from "../../Messages/messages";

@observer
class Vacations extends React.Component {

    static propTypes = {
        appStore: PropTypes.object.isRequired
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

    onVacationDatesChange = (startDate, endDate) => {

        if (startDate && !startDate.isSame(this.props.appStore.selectedEmployee.vacation_start)) {
            this.props.appStore.setVacationStartDate(startDate);
        }
        this.props.appStore.setVacationEndDate(endDate);
    }

    isDayBlocked = (day) => {

        const startDate = this.props.appStore.selectedEmployee.vacation_start;
        const endDate = this.props.appStore.selectedEmployee.vacation_end;

        return (day.isBefore(startDate, 'day') && !endDate) === true;
    };

    onEmployeeSelect = (event) => {
        const selectedEmployee = this.props.appStore.vacations[event.target.value];
        this.props.appStore.setSelectedEmployee(selectedEmployee);
    }

    render() {
        const {vacations, selectedEmployee} = this.props.appStore;
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
                    <Col className="date-picker" sm ={6}>
                        <DatePickerInput
                            startDate={selectedEmployee.vacation_start ? moment(selectedEmployee.vacation_start) : null}
                            endDate={selectedEmployee.vacation_end ?  moment(selectedEmployee.vacation_end) : null}
                            onVacationDatesChange={this.onVacationDatesChange}
                            isDayBlocked={this.isDayBlocked}
                        />
                    </Col>
                </Row>
                <Row className="employee-selector">
                    <Col sm={6}>
                        <FormControl
                            componentClass="select"
                            placeholder={M.selectProjectPlaceholder}
                            onChange={this.onEmployeeSelect}
                        >
                        {vacations.map((vacation, index) =>
                            <option
                                key = {index}
                                value={index}>
                                {`${vacation.firstname} ${vacation.lastname}`}
                            </option>
                            )}
                        </FormControl>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;