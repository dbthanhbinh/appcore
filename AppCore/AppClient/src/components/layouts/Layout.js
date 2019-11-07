import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navitem from '../layouts/Nav'
// import Sidebar from './Sidebar'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Navitem />
                <Container>
                    <Row>
                        <Col md={2}>
                            <Row>
                            {/* <Sidebar /> */}
                            </Row>
                        </Col>
                        <Col md={10}>
                            <div className='main-contents'>
                                {this.props.children}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout