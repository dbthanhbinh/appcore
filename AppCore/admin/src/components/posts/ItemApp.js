import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Item'
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
                <Row>
                    <Col md={8}>
                        <ItemForm { ...this.props } />
                        <ItemList items={ items } {...this.props} />
                    </Col>
                    <Col md={4}>
                        fasd
                    </Col>
                </Row>
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