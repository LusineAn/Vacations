import React from "react";
import PropTypes from 'prop-types';
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
        isOutsideRange: PropTypes.func,
        isDayBlocked: PropTypes.func
    }

    state = {
        focusedInput: 'startDate',
        startDate: null,
        endDate: null
    };

    onDatesChange = (date) => {

        const {focusedInput} = this.state;
        const startDate = date.startDate;
        const endDate = focusedInput === 'startDate' ? null : date.endDate;
        const onVacationDatesChange = this.props.onVacationDatesChange;

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

    isDayBlocked = (day) => {
        const {isDayBlocked} = this.props;
        if(typeof isDayBlocked === 'function') {
            return isDayBlocked(day);
        }
        return false;
    };

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
                focusedInput={focusedInput} // PropTypes.oneOf([startDate, endDate]) or null,
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                isDayBlocked={this.isDayBlocked}  //Figure out which dates we allow to select
                numberOfMonths={2}
            />
        )
    }
}

export default DatePickerInput;