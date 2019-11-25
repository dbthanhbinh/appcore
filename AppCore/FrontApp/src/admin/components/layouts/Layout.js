import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navitem from '../Nav'
// import Sidebar from './Sidebar'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <Row>
                        
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Navitem />
                        </Col>
                        <Col md={9}>
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