import React, {useState, useContext, useEffect} from 'react';
import {Form, NavDropdown, ButtonGroup, Navbar, Nav} from 'react-bootstrap'
import {withRouter, Link} from 'react-router-dom';
import MenuUsuario from './MenuUsuario';
import UserContext from '../../UserContext';

function Menu(props){
    const contexto = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to='/menu'>
                {/* <img
                    src={window.location.origin + '/logo_uach.png'}
                    // width="50"
                    // height="50"
                    className="d-inline-block align-top"
                    alt="Logo Universidad Austral de Chile"
                /> */}
                SangrIA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link as={Link} to='/'>Home</Nav.Link> */}
                    <NavDropdown title="Subir Imagen" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to='/'>Tomar Foto</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* <Dropdown.Header>INFORMES</Dropdown.Header> */}
                        <NavDropdown.Item as={Link} to='/'>Seleccionar foto desde biblioteca</NavDropdown.Item>
                        
                    </NavDropdown>
                    <NavDropdown title="Ejercitar" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to='/ejercitar'>Go</NavDropdown.Item>
                    </NavDropdown>
                    {contexto.perfil.academico==true &&
                        <NavDropdown title="Dataset" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to='/informacion'>Respuestas</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
                <Form inline className="float-right">
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    <ButtonGroup>
                        <MenuUsuario/>
                    </ButtonGroup>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Menu);