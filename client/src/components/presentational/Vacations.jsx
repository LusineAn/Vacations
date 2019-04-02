import React from "react";
import {observer, toJS} from "mobx-react";
import PropTypes from 'prop-types';
import moment from 'moment';

import {Grid, Row, Col, FormControl} from 'react-bootstrap';
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
        this.props.appStore.setIsVacationsIntersect(false);
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
        this.props.appStore.setIsVacationsIntersect(false);
        if(!event.target.value.trim()) {
            return
        }
        const selectedEmployee = this.props.appStore.vacations[event.target.value];
        this.props.appStore.setSelectedEmployee(selectedEmployee);
    }

    render() {
        const {vacations, selectedEmployee, isVacationsIntersect} = this.props.appStore;
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
                        <span>{M.selectEmployeeForVacation}</span>
                        <FormControl
                            componentClass="select"
                            onChange={this.onEmployeeSelect}
                        >
                        <option value="">{M.selectOption}</option>
                        {vacations.map((vacation, index) =>
                            <option
                                key = {index}
                                value={index}>
                                {`${vacation.firstname} ${vacation.lastname}`}
                            </option>
                            )}
                        </FormControl>
                        {isVacationsIntersect &&
                            <span className="vacation-warning-message">{M.vacationWarning}</span>
                        }
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;