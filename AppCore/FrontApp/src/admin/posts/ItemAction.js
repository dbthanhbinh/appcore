import React, { Fragment } from 'react'
import _ from 'lodash'
import PostActions from '../../store/PostActions'

class ItemActions extends React.Component {
    constructor(props){
        super(props)

        this.PostActions = new PostActions()
        this.state = {
            isLoading: false
        }
        this.onHandleDeleteItem = this.onHandleDeleteItem.bind(this)
    }

    onHandleDeleteItem(id){
        if(!id) return
        let { onHandleDeleteItemState } = this.props
        let payload = {
            url: 'Post/deletePost',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({ isLoading: true }), ()=>{
                this.PostActions.deleteItem(payload, (err, result)=> {
                    if(err) return
                    if(!err && result) onHandleDeleteItemState(id)
                })
            })
        }
    }

    render(){
        let { isLoading } = this.state
        let {
            currentRoute,
            item,
            currentEditId,
            isEdit,
            isDelete,
        } = this.props
        
        let disableItem = false
        var title = null
        if(item.id === currentEditId){
            if (isEdit && isDelete)
            disableItem = true
            title = 'Can not Del'
        }

        return <Fragment>
            <button title={title} onClick={!disableItem ? ()=>this.onHandleDeleteItem(item.id) : null } className={`ui ${isLoading ? 'loading' : ''} button ${disableItem ? 'disabled' : ''}`} >Del</button>
            <a className={ disableItem ? 'disabled' : '' } href={`admin/${currentRoute}/edit/${item.id}`}>Edit</a>
        </Fragment>
    }
}

export default ItemActions