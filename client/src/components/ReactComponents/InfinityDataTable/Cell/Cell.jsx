import React from 'react';
import PropTypes from 'prop-types';

import Head from '../Head';
import Date from './DateCell';
import Boolean from './BooleanCell';
import Buttons from './ButtonsCell';
import Link from './LinkCell';

/**
 * DataTable cell component
*/
class Cell extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        source: PropTypes.any,
        rowSource: PropTypes.any
    };

    render() {
        return (
            <td
                className={this.props.className}
            >
                {this.props.children}
            </td>
        );
    }
}

Cell.Head = Head;
Cell.Date = Date;
Cell.Boolean = Boolean;
Cell.Buttons = Buttons;
Cell.Link = Link;

export default Cell;
export {Cell, Head, Date, Boolean, Buttons, Link};