import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Item'
import { Col } from 'react-bootstrap'
import ItemList from './ItemList'
import ItemForm from './ItemForm'
import { deleteItem, getItemList } from '../../store/ItemActions'
import Utils from '../commons/utils'

class ItemApp extends Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        let { items } = this.props
        return(
            <Fragment>
                <Col sm={11}>
                    <ItemForm { ...this.props } />
                    <ItemList items={ items } {...this.props} />
                </Col>
                <Col sm={1}>
                    
                </Col>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    let { items } = state.items
    return { items }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ItemApp)