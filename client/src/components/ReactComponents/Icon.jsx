// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

// // import fontAwesome from '@fortawesome/fontawesome';
// // import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// // import {Svg} from './Svg';

// // import {ICONS} from '../icons';
// // import {fas as fapSolid} from '@fortawesome/pro-solid-svg-icons';
// // import {far as fapRegular} from '@fortawesome/pro-regular-svg-icons';
// // import {fal as fapLight} from '@fortawesome/pro-light-svg-icons';
// // import {fab} from '@fortawesome/free-brands-svg-icons';
// fontAwesome.library.add(fapSolid, fapRegular, fapLight, fab);

// class Icon extends React.Component {
//     static propTypes = {
//         className: PropTypes.string,
//         isWTIcon: PropTypes.bool,
//         name: PropTypes.string.isRequired,
//         size: PropTypes.oneOf(['lg', 'xs', 'sm', '2x', '3x', '4x', '5x']),
//         type: PropTypes.oneOf(['solid', 'light', 'regular', 'brands']),
//         rotation: PropTypes.oneOf([90, 180, 270]),
//         pull: PropTypes.oneOf(['left', 'right'])
//     };

//     static defaultProps = {
//         type: 'light',
//         size: 'sm'
//     };

//     getFontPrefix(type) {
//         switch (type) {
//             case 'solid':
//                 return 'fas';
//             case 'light':
//                 return 'fal';
//             case 'regular':
//                 return 'far';
//             case 'brands':
//                 return 'fab';
//             default:
//                 return 'fal';
//         }
//     }

//     render() {
//         const {isWTIcon, type, className, name} = this.props;
//         const prefix = this.getFontPrefix(type);
//         const classes = classnames('icon', className);

//         return (
//             isWTIcon ?
//                 <Svg name={name}
//                     svg={ICONS[name]}
//                     className={classes}
//                 /> :
//                 <FontAwesomeIcon
//                     className={classes}
//                     icon={[prefix, name]}
//                     size={this.props.size}
//                     rotation={this.props.rotation}
//                     pull={this.props.pull}
//                 />
//         );
//     }
// }

// export default Icon;
// export {Icon};