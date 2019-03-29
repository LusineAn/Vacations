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
        const vacation_start = startDate;
        const vacation_end = endDate;
        if (startDate) {
            this.props.appStore.setVacationStartDay(vacation_start);
        }
        if(endDate) {
            this.props.appStore.setVacationEndDay(vacation_end);
        }
    }

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
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;