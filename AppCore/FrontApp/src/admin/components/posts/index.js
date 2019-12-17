import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import {  Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Post'
import Utils from '../../../apis/utils'
import PostList from './PostList'
import HeaderSection from '../commons/HeaderSection'
import PostForm from '../posts/PostForm'
import PostActions from '../../../store/PostActions'

class PostApp extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        this.state = {
            isLoading: false,
            currentRoute: 'posts'
        }
        this.isEditId = false
    }

    componentDidMount(){
        // For Edit case
        let payload = null
        let id = _.get(this.props, 'match.params.id')        
        if(id) {
            this.isEditId = id
        }
        else {
            payload = {
                url: 'Post/getAll',
                body: {}
            }
            this.PostActions.getListItems(payload, (err, result)=> {
                if(err) return
                let resultData = result ? Utils.getResApi(result) : null
                if(resultData)
                    this.props.fetchItem(resultData)
                this.setState({isLoading: false})
            })
        }
    }

    render() {
        let { isLoading, currentRoute } = this.state
        let { postData } = this.props
        let postList = _.get(postData, 'postList')
        return(
            <Fragment>
                <Grid>
                    <HeaderSection {...this.props} />
                    <PostList
                        postList={ postList }
                        isLoading={isLoading}
                        currentRoute={currentRoute}
                        onHandleDeleteItemState={this.props.deleteItem}
                    />
                </Grid>
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