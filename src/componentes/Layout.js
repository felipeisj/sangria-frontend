import React from 'react';
import Menu from './Menu.js';
import {Container, Row, Col, Breadcrumb, Badge} from 'react-bootstrap';


function Layout(props) {



    return (
        <Container fluid={true}>
            <Row>
                {/* <Col> */}
                    {/* <Menu /> */}
                {/* </Col> */}
            </Row>
            <Row style={{paddingTop:'10px'}}>
                <Col>
                    <Breadcrumb>
                        {/* <Breadcrumb.Item as={Link} to='/'>Home</Breadcrumb.Item> */}
                        <Breadcrumb.Item active>{props.title2}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>{props.children}</Col>
            </Row>
            <footer>
                <hr />
                <a href="/">Esta frase pertenece a Layout</a>
            </footer>
        </Container>
    );
}

export default Layout;
