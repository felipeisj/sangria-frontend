import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import Layout from '../componentes/Layout';
import { Link } from 'react-router-dom';
import {Container, Row, Col, Card, Button, Jumbotron} from 'react-bootstrap';
import {Api} from '../utils/Api';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabla from '../componentes/Tabla';



function Inicio(props) {
    const products = []
    const [usuarios, setUsuarios] = useState([])
    useEffect(
        () => {
            data()
        },
        []
    )

    async function data(){
        let respuesta = await Api("api/usuarios/test", {}, {}, false, 'get')
        console.log(respuesta)
        setUsuarios(respuesta.data.usuarios)
    

    }
    
    return (
        <Layout title="Inicio">
            <Container fluid="md">
                <Row>

                </Row>
            </Container>

        </Layout>

    )
}

export default Inicio;