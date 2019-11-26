import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
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
                    <Grid>
                        <Grid.Row className='app-header'>
                            <Grid.Column>
                                {
                                    headerInfomations && headerInfomations.bannerHeader && headerInfomations.bannerHeader.src
                                    ? <img src={headerInfomations.bannerHeader.src} alt='' />
                                    : null
                                }
                                
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='app-nav'>
                            <Grid.Column md={12}><Navitem navigation={navigationInfomations.navigation}/></Grid.Column>
                        </Grid.Row>
                        <Grid.Row  columns={3} className='app-main-body'>
                            <Grid.Column width={3}>
                                <LSidebar />
                            </Grid.Column>
                            <Grid.Column width={10} className='main-contents'>
                                {this.props.children}
                            </Grid.Column>
                            <Grid.Column  width={3}>
                                <RSidebar />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='app-footer'>
                            <Grid.Column>
                                <Footer
                                    companyInfomations = { publicSetting.companyInfomations }
                                    socialNetworkInfomations = { publicSetting.socialNetworkInfomations }
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout