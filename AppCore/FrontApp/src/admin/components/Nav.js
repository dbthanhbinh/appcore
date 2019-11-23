import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap'

const Navitem = () => {
    return(
        <Fragment>
            <Nav>
                <Nav.Item>
                    <Nav.Link href='/admin/posts'>Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/admin/categories'>Category</Nav.Link>
                </Nav.Item>
            </Nav>
        </Fragment>
    )
}

export default Navitem