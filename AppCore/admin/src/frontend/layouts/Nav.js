import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap'

const Navitem = () => {
    return(
        <Fragment>
            <Nav>
                <Nav.Item>
                    <Nav.Link href='#'>Trang chủ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='#'>Cam kết</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='#'>Thanh toán</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='#'>Liên hệ</Nav.Link>
                </Nav.Item>
            </Nav>
        </Fragment>
    )
}

export default Navitem