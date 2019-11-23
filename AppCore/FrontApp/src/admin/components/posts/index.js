import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
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
                <Row>
                    <Col md={12}>
                        <HeaderSection {...this.props} />
                        <PostList postData={ postData } {...this.props} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    let { postData } = state.postData
    return { postData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PostApp)