import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import LoadingItem from '../commons/LoadingItem'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
class ItemList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    renderItemActions(currentRoute, item, currentEditId, isEdit){
        let disableItem = false
        let title = '';
        if(item.id === currentEditId && isEdit){
            disableItem = true
            title = 'Can not Del'
        }
        return <Fragment>
            <span as='a' title={title} className={ disableItem ? 'disabled' : '' } onClick={!disableItem ? ()=>this.props.onDeleteCategory(item.id) : null }>Del</span> |
            <a className={ disableItem ? 'disabled' : '' } href={`admin/${currentRoute}/edit/${item.id}`}>Edit</a>
        </Fragment>
    }

    render(){
        let { items, currentRoute, currentEditId, isEdit } = this.props
        let { isLoading } = this.state
        return(
            isLoading ? <LoadingItem />
            : (items && !_.isEmpty(items)) && <Fragment>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {
                            items.map((item) => {
                                return (
                                    <tr key={ item.id }>
                                        <td>00</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.slug }</td>
                                        <td>{this.renderItemActions(currentRoute, item, currentEditId, isEdit)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

export default ItemList