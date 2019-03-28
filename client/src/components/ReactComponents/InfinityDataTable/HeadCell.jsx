import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {DATATABLE} from '../../constants';

import Icon from '../Icon';

const SORTED_CLASS = 'sorted';
const SORTABLE_CLASS = 'sortable';
const STICKY_CLASS = 'th--sticky';
const {ASC, DESC} = DATATABLE.SORT_DIRECTIONS;

/**
 * DataTable headCell component
 * Consumed by Head component
*/
class HeadCell extends React.Component {
    static propTypes = {
        attribute: PropTypes.any,
        className: PropTypes.string,
        children: PropTypes.node,
        sortable: PropTypes.bool,
        sorted: PropTypes.bool,
        sortType: PropTypes.oneOf(['alpha', 'numeric', 'amount', '']),
        sortDirection: PropTypes.oneOf(['asc', 'desc']),
        onSort: PropTypes.func,
        onHeadClick: PropTypes.func,
        title: PropTypes.string,
        stickyHeader: PropTypes.bool
    };

    static defaultProps = {
        sortable: false,
        sortType: 'amount',
        sortDirection: 'asc'
    };

    constructor() {
        super(...arguments);

        this.state = {
            sortDirection: this.props.sortDirection,
        };
    }

    /**
     * Event handler
     */
    onSortClick = () => {
        // If this is sortable, call props.onSort and pass col key and new sort dir.
        if (this.props.sortable && this.props.onSort) {
            let colKey = this.props.attribute;
            let sortDir = this.flipSort(this.state.sortDirection);

            this.props.onSort(colKey, sortDir);
            this.setState({
                sortDirection: sortDir
            });
        }
        else if (this.props.onHeadClick) {
            this.props.onHeadClick(...arguments);
        }
    };

    /**
     * Render the component
    */
    render() {
        let jsxSortIcon = null;
        let sortProps;
        if (this.props.sortable && this.props.onSort) {
            // If sortable, and is sorting by this col, determine sort icon to show.
            if (this.props.sorted) {
                const iconName = this.getSortIcon(this.state.sortDirection);
                jsxSortIcon = <Icon name={iconName} />;
            }

            sortProps = {
                onClick: this.onSortClick
            };
        }
        const classes = classnames(
            this.props.className,
            {
                [SORTABLE_CLASS]: this.props.sortable,
                [SORTED_CLASS]: this.props.sorted,
                [STICKY_CLASS]: this.props.stickyHeader
            }
        );
        return (
            <th
                className={classes}
                title={this.props.title}
                {...sortProps}
            >
                {this.props.children}
                {jsxSortIcon}
            </th>
        );
    }

    /**
     * Return the correct sort icon class name
     * @param {*} sortDirection
     */
    getSortIcon(sortDirection = 'asc') {
        const direction = (sortDirection === ASC ? 'down' : 'up');
        return `angle-${direction}`;
    }

    /**
     * Return the opposite sort direction
     * @param {*} sortDir
     */
    flipSort(sortDir) {
        return sortDir === ASC ? DESC : ASC;
    }
}

export default HeadCell;
export {HeadCell};