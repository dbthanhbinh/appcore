import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Post'
import Utils from '../../apis/utils'
import PostList from './PostList'
import HeaderSection from '../commons/HeaderSection'
import PostActions from '../../store/PostActions'

class PostApp extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        this.pagination = Utils.resetPagination()
        this.paginationPath = '/admin/posts/paging'
        this.state = {
            isLoading: false,
            currentRoute: 'posts'
        }
        this.isEditId = false
    }

    componentDidMount(){
        // For Edit case
        let pageSize = this.pagination.pageSize
        let currentPage = this.pagination.currentPage
        let payload = null
        let paging = _.get(this.props, 'match.params.paging')
        let page = _.get(this.props, 'match.params.page')
        if(paging === 'paging' && page){
            pageSize = 5
            currentPage = page
        }
        
        payload = {
            url: `Post/filterPosts/${pageSize}/${currentPage}`,
            body: {}
        }
        this.PostActions.getListItems(payload, (err, result)=> {
            if(err) return
            let {data, paging} = result ? Utils.getResTaskPagingApi(result) : null
            if(data){
                this.props.fetchItem(data)
                this.pagination = Utils.mapPaginationValue(paging)
                this.setState({isLoading: false})
            }
        })
    }

    render() {
        let { isLoading, currentRoute } = this.state
        let { postData } = this.props
        let postList = _.get(postData, 'postList')
        return(
            <Fragment>
                <HeaderSection {...this.props} />
                <PostList
                    paginationPath={this.paginationPath}
                    pagination={this.pagination}
                    postList={ postList }
                    isLoading={isLoading}
                    currentRoute={currentRoute}
                    onHandleDeleteItemState={this.props.deleteItem}
                />
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    let { postData } = state.postData
    let { categoryData } = state.categoryData
    let { tagData } = state.tagData
    return { postData, categoryData, tagData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PostApp)