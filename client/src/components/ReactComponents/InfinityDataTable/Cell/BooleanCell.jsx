import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classnames from 'classnames';
import {kebabCase} from 'lodash';

import Cell from './Cell';
import Icon from '../../Icon';

class BooleanCell extends React.Component {
    static propTypes = {
        rowKey: PropTypes.any,
        rowSource: PropTypes.instanceOf(Immutable.Map),
        attribute: PropTypes.string,
        className: PropTypes.string,
        hideFalseValue: PropTypes.bool
    };

    render() {
        const {attribute} = this.props;
        const value = this.props.rowSource.get(attribute);
        const iconName = (value ? 'check' : 'ban');
        const cellClasses = classnames(`cell-boolean__${value}`, this.props.className);
        const iconClass = `${kebabCase(attribute)}__${value}`;

        let icon = (<Icon name={iconName} className={iconClass} />);
        if (this.props.hideFalseValue === true && value === false) {
            icon = null;
        }

        return (
            <Cell
                className={cellClasses}
            >
                {icon}
            </Cell>
        );
    }
}

export default BooleanCell;
export {BooleanCell};