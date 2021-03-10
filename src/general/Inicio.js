import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import Layout from '../componentes/Layout';
import { Link } from 'react-router-dom';
import {Container, Row, Button, Card} from 'react-bootstrap';
import {Api} from '../utils/Api';




function Inicio(props) {
    function ingresar() {
        props.history.push('/login');
    }

    return (
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title>Bienvenido a SangrIA</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Investigador Responsable: Felipe Salazar</Card.Subtitle>
                            <Card.Text>
                            Con el software SangrIA usted podrá clasificar elementos formes. Hay dos maneras de hacerlo,
                            puede ejercitar su capacidad de reconocimiento al etiquetar células o si tiene dudas sobre la 
                            clasificación de una muestra de sangre, puede subirla a SangrIA y el software la clasificará
                            por usted.
                            </Card.Text>
                            <Button variant="primary" onClick={ingresar}>Ingresar</Button>
                            <Button variant="light">Solicitar Cuenta</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>

    )
}

export default Inicio;