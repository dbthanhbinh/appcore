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
        this.onHandleClick = this.onHandleClick.bind(this)
    }

    componentDidMount(){
        let payload = {
            url: 'Post/getAll',
            body: {}
        }
        //this.props.fetchItem()
        getItemList(payload, (result)=> {
            let resultData = Utils.getResApi(result)
            this.props.fetchItem(resultData)
        })
    }

    onHandleClick(id){
        if(!id) return

        let payload = {
            url: 'Post/deletePost',
            body: { Id: id }
        }
        // eventEmitter.emit('handle-submit-form-data', { isLoading: true })
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({ isLoading: false }), ()=>{
                deleteItem(payload, (result)=> {
                    this.props.deleteItem(id)
                })
                // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
            })
        }

        //this.props.deleteItem(id)
    }

    render() {
        let { items } = this.props
        return(
            <Fragment>
                <Col sm={11}>
                    <ItemForm
                        { ...this.props }
                    />
                    <ItemList
                        items={ items }
                        onHandleClick={this.onHandleClick}
                    />
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