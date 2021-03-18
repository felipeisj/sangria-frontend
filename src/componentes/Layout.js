import React from 'react';
import Menu from './menu/Menu.js';
import {Container, Row, Col, Breadcrumb, Badge} from 'react-bootstrap';
import "./Layout.css";

function Layout(props) {
    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row style={{paddingTop:'10px'}}>
                <Col>
                    <Breadcrumb>
                        {/* <Breadcrumb.Item as={Link} to='/'>Home</Breadcrumb.Item> */}
                        <Breadcrumb.Item active></Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>{props.children}</Col>
            </Row>
            <footer>
                <hr />
                <a href="/menu">Sangria: Inteligencia artificial en suestras de sangre</a>
            </footer>
        </Container>
    );
}

export default Layout;
