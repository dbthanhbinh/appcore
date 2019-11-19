import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navitem from './Nav'
import Loading from '../commons/Loading'
import LSidebar from './LSidebar'
import RSidebar from './RSidebar'
import Footer from './Footer'
import '../assets/index.scss'

class Layout extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Fragment>
                <Container>
                    <Row className='app-header'>
                        <Col md={12}>
                            <img src='images/banner-sim-gia-goc.jpg' alt='' />
                        </Col>
                    </Row>
                    <Row className='app-nav'>
                        <Col md={12}><Navitem /></Col>
                    </Row>
                    <Row className='app-main-body'>
                        <Col className='app-contents' md={9}>
                            <Row>
                                <Col md={4}>
                                    <LSidebar />
                                </Col>
                                <Col className='main-contents' md={8}>
                                    {this.props.children}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <RSidebar />
                        </Col>
                    </Row>
                    <Row className='app-footer'>
                        <Col md={12}>
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