import React from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import 'react-dates/initialize';

import {DayPickerRangeController} from 'react-dates';

// import '../../../assets/stylesheets/ReactComponents/DatePickerInput.scss';
import 'react-dates/lib/css/_datepicker.css';

class DatePickerInput extends React.Component {
    
    static propTypes = {
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        onDatesChange: PropTypes.func,
        isDayHighlighted: PropTypes.func,
    }

    state = {
        showPicker: true,
        focusedInput: null
    };

    constructor() {
        super();
        this.state = {
            startDate: moment(),
            endDate: moment(),
            focusedInput: null,
            numberOfMonths: 2
        }
    }

    onDatesChange = (e) => {
        const {startDate, endDate} = e;
        if(typeof onDateChange === 'function') {
            return onDateChange(startDate, endDate);
        }
        console.log("startDate: " + moment(startDate).format('LL') + " endDate: " + moment(endDate).format('LL'));
        return false;
    };

    onFocusChange = () => {
        this.setState({
            focused: true
        });
    };

    isDayHighlighted = (day) => {
        const {isDayHighlighted} = this.props;
        if(typeof isDayHighlighted === 'function') {
            return isDayHighlighted(day);
        }
        return false;
    };

    //****************** */

    onCalendarClick = () => {
        this.showPicker();
        this.setState({
            focusedInput: 'startDate'
        });
    };

    onDateFromClick = () => {
        this.showPicker();

        this.setState({
            focusedInput: 'startDate'
        });
    };

    onDateToClick = () => {
        this.showPicker();
        this.setState({
            focusedInput: 'endDate'
        });
    };

    showPicker = () => {
        this.setState({
            showPicker: true
        });
    };

    hidePicker = () => {
        this.setState({
            showPicker: false
        });
    };

    render() {
        const {
            startDate,
            endDate
        } = this.props;
        const {numberOfMonths, focusedInput} = this.state;
        return(
            <DayPickerRangeController
                startDate={startDate} // momentPropTypes.momentObj or null,
                endDate={endDate} // momentPropTypes.momentObj or null,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                isDayHighlighted={this.isDayHighlighted}
                numberOfMonths={numberOfMonths}
                />
        )
    }
}

export default DatePickerInput;