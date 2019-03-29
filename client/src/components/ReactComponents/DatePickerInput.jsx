import React from "react";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';

import 'react-dates/initialize';

import {DayPickerRangeController} from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

class DatePickerInput extends React.Component {
    
    static propTypes = {
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        onVacationDatesChange: PropTypes.func,
        isDayHighlighted: PropTypes.func,
    }

    state = {
        focusedInput: 'startDate',
        startDate: null,
        endDate: null
    };

    onDatesChange = (date) => {
        const {startDate, endDate} = date;
        const {onVacationDatesChange} = this.props;
        if(typeof onVacationDatesChange === 'function') {
            return onVacationDatesChange(startDate, endDate);
        }
        return false;
    }

    onFocusChange = (focusedInput) => {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? 'startDate' : focusedInput,
        });
    }

    render() {
        const {
            startDate,
            endDate
        } = this.props;
        const {focusedInput} = this.state;
        return(
            <DayPickerRangeController
                startDate={startDate} // momentPropTypes.momentObj or null,
                endDate={endDate} // momentPropTypes.momentObj or null,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                numberOfMonths={2}
            />
        )
    }
}

export default DatePickerInput;