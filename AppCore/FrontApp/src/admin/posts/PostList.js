import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import LoadingItem from '../commons/LoadingItem'
import ItemActions from './ItemAction'
import Pagination from '../../helpers/PaginationGet'
import ImageView from '../components/form/ImageView'

/**
 * Input: items: [] => array of list item
 * @param {*} props 
 * Output: render list of Item as listgroup item
 */
const PostList = (props) => {
    let { postList, isLoading, currentRoute, onHandleDeleteItemState, pagination, paginationPath } = props
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
                                    <td>
                                        <ImageView className='admin-postlist-thumb' src={ (item && item.media && item.media.path) ? item.media.path : null} />
                                    </td>
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
                                        onHandleDeleteItemState={onHandleDeleteItemState}
                                    />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                pagination && pagination.totalRecords > pagination.pageSize
                ? <Pagination
                    paginationPath={paginationPath}
                    pagination={pagination}
                /> : null

            }
        </Fragment>
    )
}

export default PostList