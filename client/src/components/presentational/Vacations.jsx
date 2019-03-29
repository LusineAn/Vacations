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

        if (startDate && !startDate.isSame(this.props.appStore.employee.vacation_start)) {
            this.props.appStore.setVacationStartDate(startDate);
        }
        this.props.appStore.setVacationEndDate(endDate);
    }

    isDayBlocked = (day) => {

        const startDate = this.props.appStore.employee.vacation_start;
        const endDate = this.props.appStore.employee.vacation_end;

        return (day.isBefore(startDate, 'day') && !endDate) === true;
    };

    render() {
        const {vacations, employee} = this.props.appStore;
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
                            startDate={employee.vacation_start ? employee.vacation_start : null}
                            endDate={employee.vacation_end ?  employee.vacation_end : null}
                            onVacationDatesChange={this.onVacationDatesChange}
                            isDayBlocked={this.isDayBlocked}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;