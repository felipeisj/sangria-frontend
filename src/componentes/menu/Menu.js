import React, {useState, useEffect, useContext} from 'react';
import {Form,Button, Container, Row, NavDropdown, Dropdown, ButtonGroup, Col, Navbar, Nav} from 'react-bootstrap'
import {FaUserTie, FaShoppingCart} from 'react-icons/fa';
import {withRouter, Link} from 'react-router-dom';
import UserContext from '../../UserContext'
import MenuUsuario from './MenuUsuario';

function Menu(props){



    const contexto = useContext(UserContext)
    const [mostrarSelectorPredio, setMostrarSelectorPredio] = useState(false);
    // const tipoPredio = contexto.predio.cooperativa === true ? "Cooperativa" : "Predio";

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href={"#home"}>
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
                        <NavDropdown.Item as={Link} to={'/'}></NavDropdown.Item>
                        {/* { tipoPredio === "Cooperativa" &&
                            <NavDropdown.Item as={Link} to={'/configuracion/cooperativas/cooperados'}>Cooperados</NavDropdown.Item>
                        } */}
                        <NavDropdown.Item as={Link} to='/ejercitar'>Go</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Form inline className="float-right">
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    <ButtonGroup>
                        <Button variant="outline-secondary" size="sm">
                            Boton predios
                        </Button>
                        <MenuUsuario/>
                    </ButtonGroup>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );



}

export default withRouter(Menu);