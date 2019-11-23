import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navitem from './Nav'
import Loading from '../commons/Loading'
import LSidebar from './LSidebar'
import RSidebar from './RSidebar'
import Footer from './Footer'
import '../assets/index.scss'
import { Helmet } from 'react-helmet'
import { publicSetting } from '../../data/data'

class Layout extends Component {
    constructor(props){
        super(props)
        this.configSeoDefault = publicSetting.seoInfomations
    }

    render() {
        let headerInfomations = publicSetting.headerInfomations
        let navigationInfomations = publicSetting.navigationInfomations
        return(
            <Fragment>
                <Helmet>
                    <title>{this.configSeoDefault.seoTitle}</title>
                    <meta name="description" content={this.configSeoDefault.seoDescription} />
                </Helmet>
                <Container>
                    <Row className='app-header'>
                        <Col md={12}>
                            {
                                headerInfomations && headerInfomations.bannerHeader && headerInfomations.bannerHeader.src
                                ? <img src={headerInfomations.bannerHeader.src} alt='' />
                                : null
                            }
                            
                        </Col>
                    </Row>
                    <Row className='app-nav'>
                        <Col md={12}><Navitem navigation={navigationInfomations.navigation}/></Col>
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
                            <Footer
                                companyInfomations = { publicSetting.companyInfomations }
                                socialNetworkInfomations = { publicSetting.socialNetworkInfomations }
                            />
                        </Col>
                    </Row>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout