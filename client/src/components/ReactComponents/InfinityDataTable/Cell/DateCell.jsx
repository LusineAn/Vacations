import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {FormattedDate} from 'react-intl';

import Cell from './Cell';

class DateCell extends React.Component {
    static propTypes = {
        rowKey: PropTypes.any,
        rowSource: PropTypes.instanceOf(Immutable.Map),
        attribute: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {attribute, className} = this.props;
        const value = this.props.rowSource.get(attribute);

        let formattedDateCell;
        if (value) {
            formattedDateCell = (
                <FormattedDate value={value} />
            );
        }

        return (
            <Cell className={className}>
                {formattedDateCell}
            </Cell>
        );
    }
}

export default DateCell;
export {DateCell};