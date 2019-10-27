import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'react-bootstrap'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
const ItemList = (props) => {
    let { items } = props
    return(
        <Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>CategoryId</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>                    
                    {
                        items && !_.isEmpty(items) && items.map((item) => {
                            return (
                                <tr key={ item.id }>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                    <td>{ item.name }</td>
                                    <td>Otto</td>
                                    <th>{ item.categoryId }</th>
                                    <td><span onClick={()=>props.onHandleClick(item.id)}>Close</span></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Fragment>
    )
}

export default ItemList