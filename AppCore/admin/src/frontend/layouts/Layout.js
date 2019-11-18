import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navitem from './Nav'
import Loading from '../commons/Loading'
import LSidebar from './LSidebar'
import RSidebar from './RSidebar'
import Footer from './Footer'

class Layout extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Fragment>
                <Container>
                    <Row className='app-header'>
                        <Col md={3}>
                            Banner
                        </Col>
                    </Row>
                    <Row className='app-nav'>
                        <Col md={3}><Navitem /></Col>
                    </Row>
                    <Row className='app-main-body'>
                        <Col className='app-contents' md={9}>
                            <Row>
                                <Col md={3}>
                                    <LSidebar />
                                </Col>
                                <Col className='main-contents' md={9}>
                                    {this.props.children}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <RSidebar />
                        </Col>
                    </Row>
                    <Row className='app-footer'>
                        <Col md={3}>
                            <Footer />
                        </Col>
                    </Row>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout