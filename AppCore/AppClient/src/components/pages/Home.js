import React from 'react'
import { Col, Row } from 'react-bootstrap'

const promotions = [
    {
        id: 1,
        src: 'https://static.chotot.com/storage/marketplace/home/category/cho-tot-nha.png?v=1',
        name: 'Đồ điện tử',
        href: ''
    },
    {
        id: 2,
        src: 'https://static.chotot.com/storage/marketplace/home/category/cho-tot-nha.png?v=1',
        name: 'Đồ điện tử 2',
        href: ''
    },
    {
        id: 3,
        src: 'https://static.chotot.com/storage/marketplace/home/category/cho-tot-nha.png?v=1',
        name: 'Đồ điện tử 3',
        href: ''
    }

]

const categories = [
    {
        id: 1,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử',
        href: ''
    },
    {
        id: 2,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử 2',
        href: ''
    },
    {
        id: 3,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử 3',
        href: ''
    },
    {
        id: 4,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử 4',
        href: ''
    },
    {
        id: 5,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử 5',
        href: ''
    },
    {
        id: 6,
        src: 'https://static.chotot.com/storage/marketplace/home/category/do-dien-tu.png',
        name: 'Đồ điện tử 6',
        href: ''
    }
]

const Home = (props) => {
    return(
        <div className='main-home-page'>
            <h5>Khám phá danh mục</h5>
            {/* For promotions */}
            <Row>
                { promotions && promotions.map((item) => {
                    return <Col key={ item.id } md={4}>
                        <a href={ item.href }>
                            <img className="img-responsive" src={ item.src } alt={ item.name } />
                            <div className="_8HbYpNHde0mRwbwonofVj">
                                <span>{ item.name }</span>
                            </div>
                        </a>
                    </Col>
                }) }
            </Row>

            {/* For list of category */}
            <Row>
                {
                    categories && categories.map((item) => {
                        return <Col key={ item.id } md={2}>
                            <a href={ item.href }>
                                <img className="img-responsive" src={ item.src } alt={ item.name } />
                                <div className="_8HbYpNHde0mRwbwonofVj">
                                    <span>{ item.name }</span>
                                </div>
                            </a>
                        </Col>
                    })
                }
            </Row>
        </div>
    )
}

export default Home