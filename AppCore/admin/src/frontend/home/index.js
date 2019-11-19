import React from 'react'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Media'
import { Container, Row, Col } from 'react-bootstrap'
import ItemList from './ItemList'
import Utils from '../commons/utils'
import SimCardActions from '../../store/SimCardActions'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.SimCardActions = new SimCardActions()
    }

    componentDidMount(){
        let payload = {
            url: 'SimCard/getAll',
            body: {}
        }
        this.SimCardActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            this.props.fetchMedia(resultData)
        })
    }

    render(){
        return(
            <React.Fragment>
                <Row>
                    <div className='suplier-list'> 
                        <div className='suplier-item'>
                            <div className='suplier-item-des'>
                                <div className='suplier-logo'>
                                    <img src='images/viettel.svg' alt='Sim Viettel' width='40' />
                                </div>
                            </div>
                        </div>
                        <div className='suplier-item'>
                            <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                        <img src='images/mobifone_1.svg' alt='Sim Viettel' width='40' />
                                    </div>
                            </div>
                        </div>
                        <div className='suplier-item'>
                            <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                        <img src='images/vietnammobile.svg' alt='Sim Viettel' width='40' />
                                    </div>
                            </div>
                        </div>
                        <div className='suplier-item'>
                            <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                        <img src='images/vinaphone_1.svg' alt='Sim Viettel' width='40' />
                                    </div>
                            </div>
                        </div>
                        <div className='suplier-item'>
                            <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                        <img src='images/gmobile.svg' alt='Sim Viettel' width='40' />
                                    </div>
                            </div>
                        </div>
                        {/* <div className='suplier-item'>
                            <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                        <img src='images/itelecom.svg' alt='Sim Viettel' width='40' />
                                    </div>
                            </div>
                        </div> */}

                    </div>
                    <ItemList />
                </Row>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    let { mediaData } = state
    return { mediaData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home)