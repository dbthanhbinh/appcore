import React from 'react'
import _ from 'lodash'

const ItemActions = (props) => {
    let {
        currentRoute,
        item,
        onDeleteItem
    } = props

    let disableItem = false
    let title = '';
    
    return  <div className="btn-group btn-group-sm">
        <a title={title} className={`btn btn-info ${disableItem ? 'disabled' : ''}`}
            href={`admin/${currentRoute}/edit/${item && item.id}`}>
            <i className="fas fa-edit"></i>
        </a>
        <a title={title} className={`btn btn-danger`}
            onClick={!disableItem ? ()=>onDeleteItem(item && item.id) : null }>
            <i className="fas fa-trash"></i>
        </a>
    </div>
}
export default ItemActions