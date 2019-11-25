import React, { Fragment, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Media'
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import MediaActions from '../../../store/MediaActions'
import MediaItem from './mediaItem'
import Utils from '../../../apis/utils'
import Pagination from '../../../helpers/Pagination'
import './media.scss'

class Media extends Component {
    constructor(props){
        super(props)
        this.MediaActions = new MediaActions()
        this.state = {
            file: null
        }
        this.pagination = this.resetPagination()  // Current process pagination
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this)
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

    onPageChanged = data => {
        // const { currentPage, totalPages, pageLimit } = data;
        // let initBody = SimCardUtil.getDefaultConfigRequestFilter()
        // initBody.Supplier = this.currentSupplierActive
        // initBody.CurrentPage = currentPage
        // this.requestFilterListItems(initBody)
    }

    componentDidMount(){
        let payload = {
            url: 'Media/getAll',
            body: {}
        }
        this.MediaActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = result ? Utils.getResApi(result) : null
            if(resultData){
                this.props.fetchMedia(resultData)
                this.mapPaginationValue(Utils.getResPagingApi(result))
            }
            this.setState({isLoading: false})
        })
    }

    handleOnChangeFile(e){
        if(e && e.target && e.target.value){
            this.setState({ file: e.target.files[0] })
        }
    }

    handleSubmitForm(e){
        let { file } = this.state
        let payload = {}
        payload = {
            url: 'Media/createMedia',
            body: { File: file }
        }

        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({ isLoading: false, isShowModal: false }), ()=>{
                this.MediaActions.addItemWithForm(payload, (err, result) => {
                    if(err) return
                    let mediaData = Utils.getResTaskApi(result)
                    if(result) this.props.addMedia(mediaData)
                })
            })
        }
    }

    render(){
        let mediaList = _.get(this.props, 'mediaData.mediaList')
        return(
            <Fragment>
                <h5>Media</h5>
                <div className='media-header'>
                    <Form.Control type='file' name='file' id='file' onChange={ this.handleOnChangeFile } />
                    <Form.Group>
                        <Button variant="primary" type="button" onClick={this.handleSubmitForm}>Submit</Button>
                    </Form.Group>
                </div>
                <div className='media-list'>
                    <Row>
                    { mediaList && mediaList.map((item) => {
                    return <Col md={2} className='media-item' key={ item.id }>
                            <MediaItem item={item} />
                        </Col>
                    }) }
                    </Row>
                    {
                        this.pagination && this.pagination.totalRecords > this.pagination.pageSize
                        ? <Pagination
                            totalRecords={ this.pagination.totalRecords }
                            pageLimit={ this.pagination.pageSize }
                            currentPage={ this.pagination.currentPage }
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                            items = { mediaList || null }
                        /> : null

                    }
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { mediaData } = state.mediaData
    return { mediaData }
}
export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Media)