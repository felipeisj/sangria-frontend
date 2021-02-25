import React, {useState} from 'react';
import { NavDropdown, Dropdown, ButtonGroup} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {FaUserTie} from 'react-icons/fa';
// import {FormUsuario, getUsuario, FormCambiarPassword} from '../../modulos/administracion/FormularioUsuario';


function MenuUsuario(props) {
    const [showFormUsuario, setShowFormUsuario] = useState(false);
    const [showCambiarPassword, setShowCambiarPassword] = useState(false);
    const [usuarioForm, setUsuarioForm] = useState(
		{
			"id":"",
			"nombre": ""
		});


    const menu = () => {
        props.history.push('/');
    } 

    function formularioUsuario(){
        setShowFormUsuario(true);
    }

    function cerrarModalUsuario(){
        setShowFormUsuario(false);
        setShowCambiarPassword(false);
    }

    return (
        
        <Dropdown alignRight as={ButtonGroup}>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic" size="sm"><FaUserTie /></Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/logout'>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
            
        </Dropdown>
    );
}

export default MenuUsuario;