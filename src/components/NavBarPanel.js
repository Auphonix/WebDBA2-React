import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavBarPanel extends Component {
    constructor(props) {
        super(props);
        this.handleSignout = props.handleSignout;
    }

    render () {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Ticket System</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    { this.props.user !== null && <NavItem onClick={this.handleSignout}>Sign out</NavItem> }
                </Nav>
            </Navbar>
        )
    }
}

export default NavBarPanel;