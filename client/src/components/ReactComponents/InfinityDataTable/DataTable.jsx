import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Messages from '../../messages';

import Cell from './Cell/Cell';
import Column from './Column';
import Row from './Row';
import Head from './Head';

const INLINE = 'inline';

/**
 * DataTable component
 * Renders a data table given the following example
 *
 * `users` is an array of user objects
 *  <DataTable items={users}>
 *      <Col name="User Name" attribute="userName" sort={true} sortDirection="desc" sortType="alpha"/>
 *      <Col name="Email" attribute="email" sort={false} onSort={this.handleColSort}/>
 *      // Computed column, not sortable, custom component, custom props
 *      <Col component={UserStatusCell} foo={123} onHeadClick={this.handleUserStatusClick} />
 *      <Col name="Sub Column">
 *          <Col component={Boop} attribute="Sub1" sortable={true} />
 *          <Col component={Beep} attribute="Sub2" sortable={true} />
 *          <Col component={Bop} />
 *      </Col>
 *  </DataTable>
*/
class DataTable extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        disableScrolling: PropTypes.bool,
        stickyHeader: PropTypes.bool,
        customRowComponent: PropTypes.func,
        rowProps: PropTypes.object,
        bodyContainerDimensions: PropTypes.object,
        highlightRowOnHover: PropTypes.bool,
        showNoResult: PropTypes.bool,
        items: PropTypes.object,
        sortBy: PropTypes.string,
        sortDirection: PropTypes.oneOf(['asc', 'desc']),
        onPaginate: PropTypes.func,
        onSort: PropTypes.func,
        onRowClick: PropTypes.func,
        onColumnClick: PropTypes.func,
        pageActivePage: PropTypes.number,
        paginate: PropTypes.bool,
        paginationPosition: PropTypes.oneOf([INLINE]),
        pageSize: PropTypes.number,
        pagingObject: PropTypes.any,
        selectedRowKey: PropTypes.any,
        selectedAction: PropTypes.oneOf(['edit', 'delete']),
        areButtonsVisible: PropTypes.bool
    };

    static defaultProps = {
        paginate: false,
        pageActivePage: 1,
        paginationPosition: INLINE,
        pageSize: 100,
        stickyHeader: true,
        highlightRowOnHover: false,
        showNoResult: false,
        noResultText: Messages.dataTable.noDataAvailable
    };

    constructor(props) {
        super(props);

        this.state = {
            pageActivePage: this.props.pageActivePage
        };

        if (this.props.onColumnClick && this.props.onRowClick) {
            throw (new Error('Only one of (onColumnClick, onRowClick) is allowed per table.'));
        }
    }

    /**
     * Did mount hook
    */
    componentDidMount() {

        if (this.props.paginate) {
            this.resizeTableBody();
        }
    }

    /**
     * Handle scrolling of the data table
    */
    handleScroll = () => {
        const scrollTop = this.body.scrollTop;
        const scrollingClass = 'scrolling';

        if (scrollTop !== 0 && this.state.bodyClassName !== scrollingClass) {
            this.setState({
                bodyClassName: scrollingClass
            });
        }
        if (scrollTop === 0 && this.state.bodyClassName === scrollingClass) {
            this.setState({
                bodyClassName: null
            });
        }
    }

    /**
     * Set the current page
     * @param {*} page
     */
    handlePage(page) {
        this.setState({pageActivePage: page});
        if (this.props.onPaginate) {
            this.props.onPaginate(page);
        }
    }

    /**
     * Event handler
     * @param {*} e
     */
    handlePageBackward(e) {
        e.preventDefault();
        this.handlePage(Math.max(this.state.pageActivePage - 1, 1));
    }

    /**
     * Event handler
     * @param {*} e
     */
    handlePageForward(e) {
        e.preventDefault();
        this.handlePage(Math.max(this.state.pageActivePage + 1, 1));
    }

    /**
     * Render the table body given a data set and column form
     * @param {*} items
     * @param {*} cols
     * @private
     */
    renderTableBody(items, cols) {
        let beginIndex = 0;

        // Create the tbody
        const CustomRow = this.props.customRowComponent;

        return items.valueSeq().map((item, index) => {

            let rowKey = index;
            if (this.props.rowProps && this.props.rowProps.keyAccessor) {
                rowKey = this.props.rowProps.keyAccessor(item);
            }

            const cells = this.renderRowCells(rowKey, item, cols, beginIndex);

            //if this is a custom component, return that with cells
            //else return standard row
            if (this.props.customRowComponent) {
                return (
                    <CustomRow
                        key={`trKey_${rowKey}`}
                        rowKey={`trRowKey_${rowKey}`}
                        source={item}
                        {...this.props.rowProps}
                    >
                        {cells}
                    </CustomRow>
                );
            }
            else {
                //add row click features if enabled
                let rowClickProps;
                if (this.props.onRowClick) {
                    rowClickProps = {
                        onRowClick: this.props.onRowClick
                    };
                }

                //add row hover props if needed
                let rowHoverProps;
                if (this.props.selectedRowKey) {
                    rowHoverProps = {
                        selectedRowKey: this.props.selectedRowKey,
                        selectedAction: this.props.selectedAction
                    };
                }

                return (
                    <Row
                        key={`trKey_${rowKey}`}
                        rowKey={`trRowKey_${rowKey}`}
                        source={item}
                        {...rowClickProps}
                        {...rowHoverProps}
                        {...this.props.rowProps}
                    >
                        {cells}
                    </Row>
                );
            }
        });
    }

    /**
     * Render cell components for a given row
     * @param {*} rowKey
     * @param {*} item
     * @param {*} cols
     * @private
     */
    renderRowCells(rowKey, item, cols) {
        return cols.map((col, index, beginIndex) => {
            // Cols may use their own cell renderer component
            const CellComponent = col.props.component || Cell;

            // Cols may be _computed_ and not rely on any attribute.
            const val = col.props.attribute ? item.get(col.props.attribute) : null;

            if (col.props.component) {
                return (
                    <CellComponent
                        key={`tdColKey_${col.key}_${rowKey}`}
                        rowKey={`trRowKey_${rowKey}`}
                        source={val}
                        rowSource={item}
                        {...col.props}
                    />
                );
            }
            else {
                return (
                    <Cell
                        key={`tdColKey_${col.key}_${rowKey}`}
                        rowKey={`trRowKey_${rowKey}`}
                        className={col.props.className}
                    >
                        {val}
                    </Cell>
                );
            }
        });
    }

    /**
     * Resize the table body after adding or removing elements
     * @private
    */
    resizeTableBody() {
        if (this.props.paginationPosition === INLINE) {
            let currentHeaderHeight = this.header.thead.clientHeight;
            let currentBodyHeight = this.body.clientHeight;
            let bodyHeight = currentBodyHeight;

            bodyHeight = currentBodyHeight - currentHeaderHeight;

            this.setState({
                bodyHeight: bodyHeight
            });
        }
    }

    /**
     * Calc size of a list
     * @param {*} list
     */
    size(list) {
        if (list.size === undefined) {
            return list.length;
        }
        return list.size;
    }

    /**
     * Get an array keys value
     * @param {*} item
     * @param {*} key
     */
    value(item, key) {
        if (item.get) {
            return item.get(key);
        }
        return item[key];
    }

    /**
     * Render the component
    */
    render() {
        // Filter out null child components
        const childrenFiltered = React.Children.toArray(this.props.children).filter(child => child !== null);

        // If no column defs provided, just exit.
        if (!React.Children.count(childrenFiltered)) {
            throw (new Error('No rows in data set.'));
        }

        if (!this.props.items.size && this.props.showNoResult) {
            return (
                <div className="datatable datatable--no-result">
                    {this.props.noResultText}
                </div>
            );
        }

        // Create col definitions based on this component's col children
        // We need this step because the columns are the union of nested cols + single cols.
        const cols = [];
        React.Children.forEach(childrenFiltered, col => {
            if (col === null) {return;}
            if (React.Children.count(col.props.children)) {
                React.Children.forEach(col.props.children, c => cols.push(c));
            }
            else {
                cols.push(col);
            }
        });

        // Start showing all items passed
        const items = this.props.items;

        // Paginate if needed
        const canPaginate = this.size(items) > this.props.pageSize;
        let pagination;
        if (this.props.pagingObject && canPaginate) {
            pagination = (
                <tr>
                    <td
                        className="fixed-paging"
                        colSpan={childrenFiltered.length}
                    >
                        {this.props.pagingObject}
                    </td>
                </tr>
            );
        }

        // Sort props are defined on the DataTable component, but need to be passed on to
        // the HeadCell components for them to render correctly. We cache them in an object
        // here for easy splatting later.
        const sortProps = {
            sortDirection: this.props.sortDirection,
            sortBy: this.props.sortBy,
            onSort: this.props.onSort
        };

        const rows = this.renderTableBody(items, cols, this.props);

        // We allow disabling the scroll handling to be able to create and render the table
        // straight from a script, no browser required.
        let scrollHandler;
        if (!this.props.disableScrolling) {
            scrollHandler = {
                onScroll: this.handleScroll
            };
        }

        let bodyStyles;
        if (this.props.bodyContainerDimensions) {
            bodyStyles = {
                style: this.props.bodyContainerDimensions
            };
        }

        // Setup css classes
        const cssClasses = {
            'datatable__tr--highlight': this.props.highlightRowOnHover,
            'datatable--visible-buttons': this.props.areButtonsVisible
        };

        return (
            <div
                className={classnames('datatable', this.props.className, cssClasses)}
            >
                <div
                    ref={(d) => {this.body = d;}}
                    data-ui-role={'body'}
                    className={this.state.bodyClassName}
                    height={this.state.bodyHeight}
                    {...scrollHandler}
                    {...bodyStyles}
                >
                    <table ref={(t) => {this.table = t;}} className="table">
                        <Head
                            ref={(h) => {this.header = h;}}
                            stickyHeader={this.props.stickyHeader}
                            {...sortProps}
                        >
                            {childrenFiltered}
                        </Head>
                        <tbody>
                            {rows}
                            {pagination}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

DataTable.Cell = Cell;
DataTable.Column = Column;
DataTable.Row = Row;
export default DataTable;
export {DataTable, Cell, Column, Row};
