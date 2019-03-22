import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * DataTable row component
*/
class Row extends React.Component {
    static propTypes = {
        rowKey: PropTypes.any,
        selectedRowKey: PropTypes.any,
        selectedAction: PropTypes.oneOf(['edit', 'delete']),
        className: PropTypes.string,
        children: PropTypes.node,
        onRowClick: PropTypes.func,
        source: PropTypes.object
    };

    handleRowClick = () => {
        if (this.props.onRowClick) {
            this.props.onRowClick(this.props.rowKey, this.props.source);
        }
    };

    render() {

        let selectedClass;
        if (this.props.selectedRowKey) {
            const action = this.props.selectedAction && `--${this.props.selectedAction}` || '';
            selectedClass = this.props.selectedRowKey === this.props.rowKey && `tr__selected${action}`;
        }

        let onRowClickProps;
        if (this.props.onRowClick) {
            onRowClickProps = {
                onClick: this.handleRowClick
            };
        }

        const classes = classnames(this.props.className, selectedClass);
        return (
            <tr
                className={classes}
                {...onRowClickProps}
            >
                {this.props.children}
            </tr>
        );
    }
}

export default Row;
export {Row};