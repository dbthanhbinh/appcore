import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import LoadingItem from '../../../../components/commons/LoadingItem'
import SimCardUtil from '../commons/utils'
import BookForm from './bookForm'

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
        let i = 1;
        return(
            isLoading ? <LoadingItem />
            : <Fragment>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Supplier</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {
                            items && !_.isEmpty(items) && items.map((item) => {
                                return (
                                    <tr key={ item.id }>
                                        <td>{ i++ }</td>
                                        <td>{ item.name }</td>
                                        <td>{ SimCardUtil.getPrice(item.price) }</td>
                                        <td>{ SimCardUtil.getSupplier(item.supplier) }</td>
                                        <td>
                                            <BookForm 
                                                name = { item.name }
                                                price = { SimCardUtil.getPrice(item.price) }
                                                supplier = { SimCardUtil.getSupplier(item.supplier) }
                                            /> 
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