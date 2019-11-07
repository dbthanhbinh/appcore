import React, { Fragment } from 'react'
import { Nav, Container } from 'react-bootstrap'

const Navitem = () => {
    return(
        <Fragment>
            <Nav className='main-navbar navbar navbar-light static-top'>
                <Container>
                    <Nav.Item>
                        <Nav.Link href='#'>Link1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='#'>Link2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='#'>Link3</Nav.Link>
                    </Nav.Item>
                </Container>
            </Nav>
        </Fragment>
    )
}

export default Navitem