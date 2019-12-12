import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'

const ItemActions = (props) => {
    let {
        currentRoute,
        item,
        currentEditId,
        isEdit,
        isDelete,
        onDeleteItem
    } = props
    
    let disableItem = false
    let title = '';
    if(item.id === currentEditId){
        if (isEdit && isDelete)
        disableItem = true
        title = 'Can not Del'
    }
    return <Fragment>
        <span as='a' title={title} className={ disableItem ? 'disabled' : '' } onClick={!disableItem ? ()=>onDeleteItem(item.id) : null }>Del</span> |
        <a className={ disableItem ? 'disabled' : '' } href={`admin/${currentRoute}/edit/${item.id}`}>Edit</a>
    </Fragment>
}

export default ItemActions