import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap'

const Navitem = () => {
    return(
        <Fragment>
            <Nav>
                <Nav.Item>
                    <Nav.Link href='#'>Link1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='#'>Link2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='#'>Link3</Nav.Link>
                </Nav.Item>
            </Nav>
        </Fragment>
    )
}

export default Navitem