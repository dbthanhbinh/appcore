import React from 'react'
import eventEmitter from '../../../../utils/eventEmitter'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../../store/SimCard'
import ItemList from './ItemList'
import Utils from '../../../commons/utils'
import SimCardUtil from '../commons/utils'
import SimCardActions from '../../../../store/SimCardActions'
import Pagination from '../../../../helpers/Pagination'
import LoadingItem from '../../../commons/LoadingItem'

const API_REQUESTS = {
    API_FILTER_SIMCARD_BY: 'SimCard/filterSimCardBy'
}

const EVENT_REQEUESTS = {
    EVENT_HANDLE_LOADING_LIST_SIMCARD: 'handle-loading-list-simcart'
}

class SimCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.pagination = this.resetPagination()  // Current process pagination
        this.currentSupplierActive = null
        this.SimCardActions = new SimCardActions()
    }

    componentDidMount(){
        // Post method: Load list items with all supplier
        this.requestFilterListItems(SimCardUtil.getDefaultConfigRequestFilter())
    }

    getListItems(payload){
        this.SimCardActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            this.props.fetchSimCard(resultData)
        })
    }

    resetPagination(){
        return {
            totalPages: 0,
            totalRecords: 0,
            currentPage: 0,
            pageSize: 0,
            isPaging: false
        }
    }

    mapPaginationValue(pagingData){
        if(pagingData){
            this.pagination = {
                totalPages: pagingData.totalPages,
                totalRecords: pagingData.totalRecords,
                currentPage: pagingData.currentPage,
                pageSize: pagingData.pageSize,
                isPaging: pagingData.isPaging
            }
        }
    }

    requestFilterListItems(initBody){
        eventEmitter.emit(EVENT_REQEUESTS.EVENT_HANDLE_LOADING_LIST_SIMCARD, { isLoading: true })
        if(initBody) {
            let payload = {
                url: API_REQUESTS.API_FILTER_SIMCARD_BY,
                body: initBody
            }
            // Post method
            this.SimCardActions.filterItemsBy(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                // Process paging
                this.mapPaginationValue(Utils.getResPagingApi(result))
                this.props.fetchSimCard(resultData)
                eventEmitter.emit(EVENT_REQEUESTS.EVENT_HANDLE_LOADING_LIST_SIMCARD, { isLoading: false })
            })
        }
    }

    // Click filter item by supplier
    filterSimCardBy(key){
        if(key){
            // Reset when re-select supplier
            this.pagination = this.resetPagination()
            this.currentSupplierActive = key
            let initBody = SimCardUtil.getDefaultConfigRequestFilter()
            initBody.Supplier = key  // supplier name
            this.requestFilterListItems(initBody)
        }
    }

    onPageChanged = data => {
        const { currentPage } = data;
        let initBody = SimCardUtil.getDefaultConfigRequestFilter()
        initBody.Supplier = this.currentSupplierActive
        initBody.CurrentPage = currentPage
        this.requestFilterListItems(initBody)
    }

    render(){
        let { simCardData } = this.props
        return(
            <React.Fragment>
                <div className='suplier-list'> 
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.currentSupplierActive, 'Viettel') }`} onClick={() => this.filterSimCardBy('Viettel')} >
                        <div className='suplier-item-des'>
                            <div className='suplier-logo'>
                                <img src='images/viettel.svg' alt='Sim Viettel' width='40' />
                            </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.currentSupplierActive, 'MobiFone') }`}  onClick={() => this.filterSimCardBy('MobiFone')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/mobifone_1.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.currentSupplierActive, 'Vietnamobile') }`} onClick={() => this.filterSimCardBy('Vietnamobile')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/vietnammobile.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.currentSupplierActive, 'Vinaphone') }`} onClick={() => this.filterSimCardBy('Vinaphone')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/vinaphone_1.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                    <div className={`suplier-item ${ SimCardUtil.getActiveSupplier(this.currentSupplierActive, 'Gmobile') }`} onClick={() => this.filterSimCardBy('Gmobile')} >
                        <div className='suplier-item-des'>
                        <div className='suplier-logo'>
                                    <img src='images/gmobile.svg' alt='Sim Viettel' width='40' />
                                </div>
                        </div>
                    </div>
                </div>
                <div className='container-list-simcard'>
                    <LoadingItem />
                    <div className='list-simcard-section'>
                        <ItemList
                            items = { simCardData && simCardData.simCardList ? simCardData.simCardList : null }
                        />
                    </div>
                    {
                        this.pagination && this.pagination.totalRecords > this.pagination.pageSize
                        ? <Pagination
                            totalRecords={ this.pagination.totalRecords }
                            pageLimit={ this.pagination.pageSize }
                            currentPage={ this.pagination.currentPage }
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                            items = { simCardData && simCardData.simCardList ? simCardData.simCardList : null }
                        /> : null

                    }
                </div>
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