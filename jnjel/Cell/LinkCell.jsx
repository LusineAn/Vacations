import React from 'react';
import PropTypes from 'prop-types';
// import {Map} from 'immutable';
// import urlTemplate from 'url-template';

import {Link} from 'react-router-dom';
import Cell from './Cell';

class LinkCell extends React.Component {
    static propTypes = {
        /**
         * The rowSource map includes all related data values
         */
        rowSource: PropTypes.instanceOf(Map),
        /**
         * The current attribute name
         * The value related to this attribute is used as the
         * value of the cell display content
         */
        attribute: PropTypes.string,
        /**
         * Defines a url template
         * e.g. /accounts/{guid}/users/roles/
         * All values in {curly} braces are assumed to exist in rowSource
         */
        linkTemplate: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {attribute, className} = this.props;
        const value = this.props.rowSource.get(attribute);

        let linkCell;
        if (value) {
            let url = value;
            if (this.props.linkTemplate) {
                let urn = urlTemplate.parse(this.props.linkTemplate);
                url = urn.expand(this.props.rowSource.toJS());
            }

            linkCell = (
                <Link to={url} className={className}>
                    {value}
                </Link>
            );
        }

        return (
            <Cell>
                {linkCell}
            </Cell>
        );
    }
}

export default LinkCell;
export {LinkCell};