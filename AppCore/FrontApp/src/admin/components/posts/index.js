import React, { Component, Fragment } from 'react'
import {  Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Post'

import PostList from './PostList'
import HeaderSection from '../commons/HeaderSection'

class PostApp extends Component{
    render() {
        let { postData } = this.props
        
        return(
            <Fragment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <HeaderSection {...this.props} />
                            <PostList postData={ postData } {...this.props} />
                        </Grid.Column>
                    </Grid.Row>
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