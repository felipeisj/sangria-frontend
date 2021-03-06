import React, {useState, useContext, useEffect, Text} from 'react';
import { Dropdown, ButtonGroup} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {FaUserTie} from 'react-icons/fa';
import UserContext from '../../UserContext';
// import {FormUsuario, getUsuario, FormCambiarPassword} from '../../modulos/administracion/FormularioUsuario';


function MenuUsuario(props) {
    const [showFormUsuario, setShowFormUsuario] = useState(false);
    const [showCambiarPassword, setShowCambiarPassword] = useState(false);
    const contexto = useContext(UserContext);

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
                <Dropdown.Item>{contexto.perfil.nombre}</Dropdown.Item>
                <Dropdown.Item as={Link} to='/logout'>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
            
        </Dropdown>
    );
}

export default MenuUsuario;