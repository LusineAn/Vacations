import React from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import moment from 'moment';

import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import DataTable from "../ReactComponents/DataTable/DataTable";
import DatePickerInput from "../ReactComponents/DatePickerInput";

import M from "../../Messages/messages";

@observer
class Vacations extends React.Component {

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

    onDatesChange = (startDay, endDay) => {
        const startDate = moment(startDate).format('L');
        const endDate = moment(endDay).format('L');
        this.props.appStore.setVacationStartDay(startDay);
        this.props.appStore.setVacationEndDay(endDay);
    }

    render() {
        const {vacations, startDay, endDay} = this.props.appStore;
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
                            startDay={startDay}
                            endDay={endDay}
                            onDatesChange={this.onDatesChange}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Vacations;