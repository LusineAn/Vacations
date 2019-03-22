import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {Navbar as BSNavbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class Navbar extends Component {

    render() {
        return(
            <BSNavbar>
                <BSNavbar.Header>
                    <ul>
                        <li><Link to="/vacations">Vacations</Link></li>
                    </ul>
                </BSNavbar.Header>
                <Nav>
                <ul>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/employees">Employees</Link></li>
                </ul>
                </Nav>
            </BSNavbar>
        );
    }
}

export default Navbar;