import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import LoadingItem from '../commons/LoadingItem'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
function renderListItem(listItem, parentId, char){
    if(_.isEmpty(listItem)) return
    let menuObject = []
    listItem.forEach((element, i) => {
        if(element.parentId === parentId){
            menuObject.push(element)
            //delete listItem[i]
            listItem = listItem.filter((x) => x.id !== element.id)
        }
    })

    return menuObject && menuObject.map((item, i) => {
        return item.parentId === parentId && (<React.Fragment key={item.id}>
            {
                <tr>
                    <td>no</td>
                    <td>{char}  {item.name}</td>
                    <td>Slug</td>
                    <td>{item.parentId}</td>
                </tr> 
            }
            { renderListItem(listItem, item.id, '|--') }
        </React.Fragment>)
    })
}

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
        let { listItems, currentRoute, currentEditId, isEdit } = this.props
        let { isLoading } = this.state
        return(
            isLoading ? <LoadingItem />
            : (listItems && !_.isEmpty(listItems)) && <Fragment>
                <Table>
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
                            renderListItem(listItems, '00000000-0000-0000-0000-000000000000', '')
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

export default ItemList