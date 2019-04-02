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

        if (startDate && !startDate.isSame(this.props.appStore.selectedEmployee.start_date)) {
            this.props.appStore.setVacationStartDate(startDate);
        }
        this.props.appStore.setVacationEndDate(endDate);
    }

    isDayBlocked = (day) => {

        const startDate = this.props.appStore.selectedEmployee.start_date;
        const endDate = this.props.appStore.selectedEmployee.end_date;

        return (day.isBefore(startDate, 'day') && !endDate) === true;
    };

    onEmployeeSelect = (event) => {
        const selectedEmployee = this.props.appStore.vacations[event.target.value];
        this.props.appStore.setSelectedEmployee(selectedEmployee);
    }

    render() {
        const {vacations, selectedEmployee} = this.props.appStore;
        const {vacationHeaders} = this.state;
        const vacationsList = vacations.map(vacation => {
            const simpleVacation = {
                project: vacation.name,
                firstname: vacation.firstname,
                lastname: vacation.lastname,
                start_date: vacation.start_date ? moment(vacation.start_date).format('MM/DD/YYYY') : null,
                end_date: vacation.end_date ? moment(vacation.end_date).format('MM/DD/YYYY') : null
            };
            return simpleVacation;
        })
        return(
            <Grid>
                <Row className="vacations">
                    <Col className="vacations-list" sm={6}>
                        <DataTable
                            className="vacations-table"
                            headers={vacationHeaders}
                            items={vacationsList}
                        />
                    </Col>
                    <Col className="date-picker" sm ={6}>
                        <DatePickerInput
                            startDate={selectedEmployee.start_date ? moment(selectedEmployee.start_date) : null}
                            endDate={selectedEmployee.end_date ?  moment(selectedEmployee.end_date) : null}
                            onVacationDatesChange={this.onVacationDatesChange}
                            isDayBlocked={this.isDayBlocked}
                        />
                    </Col>
                </Row>
                <Row className="employee-selector">
                    <Col sm={6}>
                        <FormControl
                            componentClass="select"
                            placeholder={M.selectEmployeePlaceholder}
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