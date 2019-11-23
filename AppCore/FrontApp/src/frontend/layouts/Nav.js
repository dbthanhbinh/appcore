import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap'

const Navitem = (props) => {
    let { navigation } = props
    return(
        <Fragment>
            <Nav>
                { navigation && navigation.map((nav) => {
                        return <Nav.Item key={nav.id}> <Nav.Link href={nav.href}>{nav.name}</Nav.Link></Nav.Item>
                    }) }
            </Nav>
        </Fragment>
    )
}

export default Navitem