import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import LoadingItem from '../commons/LoadingItem'
import PostActions from '../../../store/PostActions'
import Utils from '../../../apis/utils'
import ItemActions from './ItemAction'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
class PostList extends React.Component{
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        this.state = {
            isLoading: true,
            currentRoute: 'posts'
        }
    }

    componentDidMount(){
        let payload = {
            url: 'Post/getAll',
            body: {}
        }
        this.PostActions.getListItems(payload, (err, result)=> {
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
                this.PostActions.deleteItem(payload, (err, result)=> {
                    if(err) return
                    if(!err && result) this.props.deleteItem(id)
                })
            })
        }
    }

    render(){
        let { postList } = this.props.postData 
        let { isLoading, currentRoute } = this.state
        return(
            isLoading ? <LoadingItem />
            : <Fragment>
                <Table>
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
                            postList && !_.isEmpty(postList) && postList.map((item, i) => {
                                return (
                                    <tr key={ item.id }>
                                        <td>{i + 1}</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.name }</td>
                                        <td>Otto</td>
                                        <td>fff</td>
                                        <td>
                                        <ItemActions
                                            currentRoute={currentRoute}
                                            currentEditId={null}
                                            isEdit={null}
                                            isDelete={null}
                                            item={item}
                                            onDeleteItem={null}
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

export default PostList