import React from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

class DataTable extends React.Component {

    static propTypes = {
        headers: PropTypes.array,
        items: PropTypes.array
    };
   
    render() {
        const {headers, items} = this.props;
        return(
            <div className="datatable__container">
                <table className="datatable">
                    <thead>
                        <tr>
                            {headers.map((header, index) =>
                                <th key={index}>{header}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) =>
                            <tr key={index}>
                            {Object.values(item).map((itemValue, index) =>
                                <td
                                    className="datatable__col"
                                    key={index}>
                                    {itemValue}
                                </td>
                            )}
                            </tr>
                        )}
                    </tbody>
                </table>    
            </div>        
        )};
}

export default DataTable;