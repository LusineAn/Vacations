import React from 'react';
import PropTypes from 'prop-types';

import HeadCell from './HeadCell';
import Buttons from './HeadButtons';

class Head extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        sortBy: PropTypes.string,
        sortDirection: PropTypes.oneOf(['asc', 'desc']),
        style: PropTypes.object,
        onSort: PropTypes.func,
        stickyHeader: PropTypes.bool
    };

    constructor() {
        super(...arguments);
        this.state = {
            sortBy: this.props.sortBy
        };
    }

    onSort = (col) => (sortBy, sortDirection) => {
        const mergedProps = {...this.props, ...col.props};
        this.setState({sortBy});
        mergedProps.onSort(sortBy, sortDirection);
    };

    render() {
        // <Col name="A">
        //     <Col name="A1"></Col>
        //     <Col name="A2"></Col>
        // </Col>
        // <Col name="B"></Col>
        // <Col name="C"></Col>
        // <Col name="D">
        //     <Col name="D1"></Col>
        //     <Col name="D2"></Col>
        //     <Col name="D3"></Col>
        // </Col>

        // produces:

        // ----------------------------------
        // |    A    | B | C |      D       |
        // ----------|   |   |---------------
        // | A1 | A2 |   |   | D1 | D2 | D3 |
        // ----------------------------------

        let firstRow = (
            <tr key="1" style={this.props.style}>
                {
                    React.Children.map(this.props.children, (col, index) => {
                        return this.makeHeadCell(
                            col.props.children,
                            col,
                            index
                        );
                    })
                }
            </tr>
        );

        let secondRow;
        let grouped = this.groupedCols(this.props.children);

        if (grouped.length) {
            secondRow = <tr key="2">{
                grouped.map((col, index) => {
                    return this.makeHeadCell(
                        [],
                        col,
                        index
                    );
                })
            }</tr>;
        }

        return (
            <thead
                ref={(t) => {this.thead = t;}}
            >
                {firstRow}
                {secondRow}
            </thead>
        );
    }

    /**
     * Group a series of columns given children
     * @param {*} cols
     * @private
     */
    groupedCols(cols) {
        const _cols = [];
        React.Children.forEach(cols, col => {
            React.Children.forEach(col.props.children, c => _cols.push(c));
        });
        return _cols;
    }

    /**
     * Generate the head cell component
     * @param {*} sortBy
     * @param {*} sortDirection
     * @param {*} sortHandler
     * @param {*} children
     * @param {*} col
     * @param {*} index
     * @private
     */
    makeHeadCell(children, col, index) {
        let headChildren = col.props.name;
        if (col.props.headComponent) {
            headChildren = col.props.headComponent;
        }

        const rowSpan = children ? 1 : 2;
        const colSpan = children && children.length ? React.Children.count(children) : 1;
        let sortProps;
        if (this.props.onSort || col.props.onSort) {
            sortProps = {
                sorted: col.props.attribute === this.state.sortBy,
                sortDirection: this.props.sortDirection,
                onSort: this.onSort(col),
            };
        }

        return (
            <HeadCell
                key={index}
                colSpan={colSpan}
                rowSpan={rowSpan}
                stickyHeader={this.props.stickyHeader}
                {...col.props}
                {...sortProps}
            >
                {headChildren}
            </HeadCell>
        );
    }
}

Head.Buttons = Buttons;

export default Head;
export {Head, Buttons};