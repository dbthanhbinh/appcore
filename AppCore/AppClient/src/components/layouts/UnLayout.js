import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
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