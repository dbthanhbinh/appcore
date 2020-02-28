import React, { Fragment } from 'react'
import _ from 'lodash'
import Pagination from '../../../helpers/PaginationGet'
import ImageView from '../../components/commons/ImagePreView/ImageView'
import ItemActions from '../../components/commons/actions/ItemActions'
import './PostList.scss'

const RenderTableNotFoundRecord = () => {
    return <tr><td>Not found record!</td></tr>
}

const RenderTableThead = () => {
    return (
        <tr>
            <th className='view-no'>#</th>
            <th className='view-image'>Image</th>
            <th className='view-name'>Task</th>
            <th>Progress</th>
            <th className='view-actions'>Actions</th>
        </tr>
    )
}

const RenderTableRow = (props) => {
    let {
        row,
        currentRoute
    } = props
    return (
        <tr>
            <td className='view-no'></td>
            <td className='view-image'>
                <ImageView
                    media={row.media}
                />
            </td>
            <td className='view-name'>{row.name}</td>
            <td>
            <div className="progress progress-xs">
                <div className="progress-bar progress-bar-danger"></div>
            </div>
            </td>
            <td className='view-actions'>
                <ItemActions
                    currentRoute={currentRoute}
                    item={row}
                    onDeleteItem={null}
                />
            </td>
        </tr>
    )
}

const PostList = (props) => {
    let {
        postList,
        pagination,
        currentRoute,
        paginationPath
    } = props

    return(
        <Fragment>
            <table className="table table-striped">
                <thead>
                    <RenderTableThead />
                </thead>
                <tbody>
                {
                    postList && !_.isEmpty(postList)
                    ? postList.map(
                        (item, index) => {
                            return <RenderTableRow
                                key={index}
                                row={item}
                                currentRoute={currentRoute}
                            />
                        }
                    )
                    : <RenderTableNotFoundRecord />
                }
                </tbody>
            </table>
            <Pagination 
                paginationPath={paginationPath}
                pagination={pagination}
            />
        </Fragment>
    )
}

export default PostList