import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import Icon from '../../Icon';

class ButtonsCell extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        return (
            <Cell
                className="td--buttons"
            >
                {this.props.children}
                <Icon
                    className="td__ellipsis--hide"
                    name="ellipsis-h"
                    pull="right"
                />
            </Cell>
        );
    }
}

export default ButtonsCell;
export {ButtonsCell};