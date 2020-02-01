import React, { Component, Fragment } from 'react'
// Redux process
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Setting'
import { Container, Grid } from 'semantic-ui-react'
import Navitem from './Nav'
import Loading from '../commons/Loading'
import LSidebar from './LSidebar'
import RSidebar from './RSidebar'
import Footer from './Footer'
import '../assets/index.scss'
import { publicSetting } from '../../data/data'
import SettingActions from '../../store/SettingActions'
import Utils from '../../apis/utils'
import HelmetSeo from './HelmetSeo'

class Layout extends Component {
    constructor(props){
        super(props)
        this.SettingActions = new SettingActions()
        this.state = {
            configLayoutSetting: {},
            configSeoDefault: {}
        }
        this.configLayoutSetting = {}
        this.initLayoutData();
    }

    initLayoutData(){
        let payload = {
            url: `Rest/getLayoutSettings`
        }
        this.SettingActions.detailItem(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result) // GeneralSeoSetting
            let themeInfomation = _.get(resultData, 'themeInfomation')
            if(themeInfomation && themeInfomation.length > 0){
                
                this.setState((prevState) => {
                    themeInfomation.forEach(e => {
                        prevState.configLayoutSetting[e.name] = (e.value) ? JSON.parse(e.value) : null
                    })
                    return prevState.configLayoutSetting
                })
            }
        })
    }
    
    render() {
        let {configLayoutSetting} = this.state
        let headerInfomations = publicSetting.headerInfomations
        let navigationInfomations = publicSetting.navigationInfomations
        return(
            <Fragment>
                <HelmetSeo configSeoDefault={_.get(configLayoutSetting, 'GeneralSeoSetting')} />
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


                        {this.props.children}


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

// export default Layout
function mapStateToProps(state){
    let { settingData } = state.settingData
    return { settingData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Layout)
