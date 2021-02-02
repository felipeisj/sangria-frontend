import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, NavDropdown, Dropdown, ButtonGroup, Col, Navbar, Nav} from 'react-bootstrap'
import {FaUserTie, FaShoppingCart} from 'react-icons/fa';
function Menu(){
    return (
        <div className="App">
        <header className="App-header">
            <Container>
            <Row>
                <Col>
                <p>
                    Hi
                </p>
                </Col>
                <Col>
                <p>
                    Bye
                </p>
                </Col>
            </Row>
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <p>
                        Nav
                        </p>
                    </Nav>

                    <Dropdown alignRight as={ButtonGroup} className="justify-content-end">
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" size="sm"><FaUserTie/></Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick=""> Nombre de usuario </Dropdown.Item>
                                <Dropdown.Item onClick=""> Cambiar Contraseña </Dropdown.Item>
                                <NavDropdown.Divider />
                            </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
            </Container>
        </header>
        </div>
    );
}

export default Menu;