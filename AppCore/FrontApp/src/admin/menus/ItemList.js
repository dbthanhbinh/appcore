import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import LoadingItem from '../commons/LoadingItem'
import { getDefaultEmptyGuid } from '../../utils/commons'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
const RenderListItem = (props) => {
    let { listItems, parentId, char, currentRoute, currentEditId, isEdit, onDeleteItem} = props
    if(_.isEmpty(listItems)) return null
    let menuObject = []
    listItems.forEach((element, i) => {
        if(element.parentId === parentId){
            menuObject.push(element)
            listItems = listItems.filter((x) => x.id !== element.id)
        }
    })

    return menuObject && menuObject.map((item, i) => {
        return item.parentId === parentId && (
            <React.Fragment key={item.id}>
                {
                    <Table.Row>
                        <Table.Cell>no</Table.Cell>
                        <Table.Cell>{char}  {item.name}</Table.Cell>
                        <Table.Cell>{item.slug}</Table.Cell>
                        <Table.Cell>
                            <RenderItemActions
                                currentRoute={currentRoute}
                                currentEditId={currentEditId}
                                isEdit={isEdit}
                                isDelete
                                item={item}
                                onDeleteItem={onDeleteItem}
                            />
                        </Table.Cell>
                    </Table.Row>
                }
                <RenderListItem
                    listItems={listItems}
                    parentId={item.id}
                    char={char + '|--'}
                    currentRoute={currentRoute}
                    currentEditId={currentEditId}
                    isEdit={isEdit}
                    onDeleteItem={onDeleteItem}
                />
            </React.Fragment>)
    })
}

const RenderItemActions = (props) => {
    let { currentRoute, item, currentEditId, isEdit, isDelete, onDeleteItem } = props
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

class ItemList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let { listItems, currentRoute, currentEditId, isEdit, onDeleteItem } = this.props
        let { isLoading } = this.state
        return(
            isLoading ? <LoadingItem />
            : (listItems && !_.isEmpty(listItems)) && <Fragment>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>No</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Slug</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            <RenderListItem
                                listItems={listItems}
                                parentId={getDefaultEmptyGuid()}
                                char=''
                                currentRoute={currentRoute}
                                currentEditId={currentEditId}
                                isEdit={isEdit}
                                onDeleteItem={onDeleteItem}
                            />
                        }
                    </Table.Body>
                </Table>
            </Fragment>
        )
    }
}

export default ItemList