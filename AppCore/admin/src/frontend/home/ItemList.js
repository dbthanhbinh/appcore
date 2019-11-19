import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import LoadingItem from '../../components/commons/LoadingItem'

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

    render(){
        let { items, currentRoute } = this.props
        let { isLoading } = this.state
        return(
            isLoading ? <LoadingItem />
            : <Fragment>
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
                            items && !_.isEmpty(items) && items.map((item) => {
                                return (
                                    <tr key={ item.id }>
                                        <td>00</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.slug }</td>
                                        <td>
                                            <span as='a' onClick={()=>this.props.onDeleteCategory(item.id)}>Del</span> |
                                            <a href={`${currentRoute}/edit/${item.id}`}>Edit</a>
                                        </td>
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