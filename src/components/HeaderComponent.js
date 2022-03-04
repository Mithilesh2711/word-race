import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {Navbar, Nav, Container} from "react-bootstrap"

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="container">
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/" ><h2 className='title'>Word Race</h2></Navbar.Brand>
                <Nav className="mx-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
                <Nav.Link href="/stats">Statistics</Nav.Link>
                </Nav>
                </Container>
                </Navbar>
          </div>
        );
    }
}

export default Header;