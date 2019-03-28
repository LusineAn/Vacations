import React from 'react';
import PropTypes from 'prop-types';

class HeadButtons extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        return (
            <span
                className="datatable__th--button"
            >
                {this.props.children}
            </span>
        );
    }
}

export default HeadButtons;
export {HeadButtons};