import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'react-bootstrap'
import LoadingItem from '../commons/LoadingItem'
import { deleteItem, getItemList } from '../../store/ItemActions'
import Utils from '../commons/utils'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
class PostList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        let payload = {
            url: 'Post/getAll',
            body: {}
        }
        getItemList(payload, (err, result)=> {
            if(err) return
            let resultData = result ? Utils.getResApi(result) : null
            if(resultData)
                this.props.fetchItem(resultData)
            this.setState({isLoading: false})
        })
    }

    onHandleClick(id){
        if(!id) return
        let payload = {
            url: 'Post/deletePost',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({ isLoading: false }), ()=>{
                deleteItem(payload, (err, result)=> {
                    if(err) return
                    if(!err && result) this.props.deleteItem(id)
                })
            })
        }
    }

    render(){
        let { items } = this.props
        let { isLoading } = this.state
        return(
            isLoading ? <LoadingItem />
            : <Fragment>
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
                                        <td>aa</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.name }</td>
                                        <td>Otto</td>
                                        <th>fff</th>
                                        <td><span onClick={()=>this.onHandleClick(item.id)}>Close</span></td>
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

export default PostList