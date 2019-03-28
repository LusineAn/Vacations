import React from 'react';
import PropTypes from 'prop-types';

/**
 * DataTable Column component
*/
class Column extends React.Component {
    static propTypes = {
        attribute: PropTypes.any,
        children: PropTypes.node,
        className: PropTypes.string,
        sortable: PropTypes.bool,
        onSort: PropTypes.func,
        headComponent: PropTypes.node
    };

    static defaultProps = {
        sortable: false
    };

    numOfChildren() {
        return React.Children.count(this.props.children);
    }

    render() {
        return;
    }
}

export default Column;
export {Column};