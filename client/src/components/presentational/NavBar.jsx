import React, { Component } from "react";

import {Navbar as BSNavbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class Navbar extends Component {

    render() {
        return(
            <BSNavbar>
                <BSNavbar.Header>
                <BSNavbar.Brand>
                    <a href="#vacations">Vacations</a>
                </BSNavbar.Brand>
                </BSNavbar.Header>
                <Nav>
                    <NavItem eventKey={2} href="#projects">Projects</NavItem>
                    <NavItem eventKey={1} href="#employees">Employees</NavItem>
                </Nav>
            </BSNavbar>
        );
    }
}

export default Navbar;