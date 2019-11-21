import React from 'react'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../../store/SimCard'
import { Container, Row, Col } from 'react-bootstrap'
import ItemList from './ItemList'
import Utils from '../../../commons/utils'
import SimCardUtil from '../commons/utils'
import SimCardActions from '../../../../store/SimCardActions'

class SimCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            supplierActive: null
        }
        this.supplierActive = null
        this.SimCardActions = new SimCardActions()
    }

    componentDidMount(){
        let payload = {
            url: 'SimCard/getAll',
            body: {}
        }
        this.getListItems(payload)
    }

    getListItems(payload){
        this.SimCardActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            this.props.fetchSimCard(resultData)
        })
    }

    filterListItems(payload){
        this.SimCardActions.getFilterItemsBy(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            this.props.fetchSimCard(resultData)
        })
    }

    filterSimCardBy(key){
        let state = this.state
        if(key){
            this.supplierActive = key
            state.supplierActive = key
            let payload = {
                url: 'SimCard/filterSimCardBy',
                body: {
                    Supplier: key
                }
            }
            this.filterListItems(payload)
        }
    }

    render(){
        let { simCardData } = this.props
        return(
            <React.Fragment>
                <div className='suplier-list'> 
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.supplierActive, 'Viettel') }`} onClick={() => this.filterSimCardBy('Viettel')} >
                        <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                <img src='images/viettel.svg' alt='Sim Viettel' width='40' />
                            </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.supplierActive, 'MobiFone') }`}  onClick={() => this.filterSimCardBy('MobiFone')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/mobifone_1.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.supplierActive, 'Vietnamobile') }`} onClick={() => this.filterSimCardBy('Vietnamobile')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/vietnammobile.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.supplierActive, 'Vinaphone') }`} onClick={() => this.filterSimCardBy('Vinaphone')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/vinaphone_1.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.supplierActive, 'Gmobile') }`} onClick={() => this.filterSimCardBy('Gmobile')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/gmobile.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                </div>
                <ItemList
                    items = { simCardData && simCardData.simCardList ? simCardData.simCardList : null }
                />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    let { simCardData } = state.simCardData
    return { simCardData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SimCard)