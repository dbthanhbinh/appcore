import React, { Fragment, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Media'
import { Form, Button, Grid } from 'semantic-ui-react'
import _ from 'lodash'
import MediaActions from '../../store/MediaActions'
import MediaItem from './mediaItem'
import Utils from '../../apis/utils'
import Pagination from '../../helpers/PaginationPost'
import './media.scss'
import { getInputData, setFieldValue }
from '../../utils/FormUtils'
import { withFormBehaviors } from '../components/form/form'

class Media extends Component {
    constructor(props){
        super(props)
        this.MediaActions = new MediaActions()

        this.state = {
            file: null
        }
        this.pagination = Utils.resetPagination()
        this.paginationPath = '/admin/categories/paging'

        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this)
        this.handleUpdateMedia = this.handleUpdateMedia.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
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

    componentDidMount(){
        let currentPage = this.pagination.currentPage
        this.filterMediaWithPaging(currentPage)
    }

    filterMediaWithPaging = (currentPage) => {
        let pageSize = 5 //this.pagination.pageSize
        let payload = {
            url: `Media/filterMedias/${pageSize}/${currentPage}`,
            body: {}
        }
        this.MediaActions.getListItems(payload, (err, result)=> {
            if(err) return

            let resultData = result ? Utils.getResApi(result) : null
            if(resultData){
                let {paging} = result
                this.props.fetchMedia(resultData)
                this.pagination = Utils.mapPaginationValue(paging)
                this.setState({isLoading: false})
            }
        })
    }

    handleOnGotoPage = (page) => {
        this.filterMediaWithPaging(page)
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

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            return { model: setFieldValue(name, value, prevState) }
        })
    }

    handleUpdateMedia(id, subName){
        if(!id || !subName) return
        let payload = {
            url: 'Media/updateMedia',
            body: {
                SubName: subName,
                Id: id
            }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.MediaActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result) this.props.updateMedia(Utils.getResApi(result))
            })
        }
    }

    render(){
        let { mediaData } = this.props
        let { mediaList } = mediaData
        return(
            <Fragment>
                <h5>Media</h5>
                <div className='media-header'>
                    <Form>
                        <Form.Field>
                            <input type='file' name='file' id='file' onChange={ this.handleOnChangeFile } />
                        </Form.Field>
                        <Form.Field>
                            <Button variant="ui primary button" type="button" onClick={this.handleSubmitForm}>Submit</Button>
                        </Form.Field>
                    </Form>
                </div>
                <Grid className='media-list'>
                    <Grid.Row columns={6}>
                    { mediaList && mediaList.map((item) => {
                    return <Grid.Column className='media-item' key={ item.id }>
                            <MediaItem item={item}
                                onHandleUpdateMedia={this.handleUpdateMedia}
                                onInputChange = { this.handleOnInputChange }
                            />
                        </Grid.Column>
                    }) }
                    </Grid.Row>
                    {
                        this.pagination && this.pagination.totalRecords > this.pagination.pageSize
                        ? <Pagination
                            paginationPath={this.paginationPath}
                            pagination={this.pagination}
                            onGotoPage={this.handleOnGotoPage}
                        /> : null

                    }
                </Grid>
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
)(withFormBehaviors(Media, null))