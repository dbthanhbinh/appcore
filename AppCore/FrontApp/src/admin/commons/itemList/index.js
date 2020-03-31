import React, { Fragment } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import LoadingItem from '../LoadingItem'
import Pagination from '../../../helpers/PaginationPost'
import './ItemList.scss'
class ItemList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    renderHeaderList = (headerListDefined) => {
        return <tr>
            {
                (headerListDefined && !_.isEmpty(headerListDefined))
                && headerListDefined.map((h, i) => {
                    if (h.isActive) {
                        return <th key={i}>{h.label}</th>
                    } else {
                        return ''
                    }
                })
            }
        </tr>
    }

    renderItemActions(currentRoute, item, currentEditId, isEdit){
        let disableItem = false
        let title = '';
        if(item.id === currentEditId && isEdit){
            disableItem = true
            title = 'Can not Del'
        }

        return  <div className="btn-group btn-group-sm">
            <a title={title} className={`btn btn-info ${disableItem ? 'disabled' : ''}`} href={`admin/${currentRoute}/edit/${item.id}`}><i className="fas fa-edit"></i></a>
            <span title={title} className={`btn btn-danger`} onClick={!disableItem ? ()=>this.props.onDeleteTag(item.id) : null }><i className="fas fa-trash"></i></span>
        </div>
    }

    renderRow = (headerListDefined, item, currentRoute, currentEditId, isEdit) => {
        let children = []
        let i = 0
        headerListDefined && headerListDefined.forEach(element => {
            if(element.isActive){
                switch(element.key) {
                    case 'no':
                        children.push(<td className='view-no' key={`${item.id}--${i+1}`}>{i+1}</td>)
                    break
                    case 'alias':
                        children.push(<td key={`${item.id}--${i+1}`}>{item.slug}</td>)
                    break
                    case 'actions':
                        children.push(<td className='view-actions' key={`${item.id}--${i+1}`}>{this.renderItemActions(currentRoute, item, currentEditId, isEdit)}</td>)
                    break
                    default:
                        children.push(<td key={`${item.id}--${i+1}`}>{item.name}</td>)
                }
                
            }
            i=i+1
        })
        return children
    }

    render(){
        let { items, currentRoute, currentEditId, isEdit, pagination, paginationPath, onGotoPage,
            headerListDefined
         } = this.props
        let { isLoading } = this.state
        let children = []
        return(
            isLoading ? <LoadingItem />
            : <Fragment>
                <Table>
                    <thead>
                        {this.renderHeaderList(headerListDefined)}
                    </thead>
                    <tbody>
                        {
                            (items && !_.isEmpty(items)) && items.map((item, i) => {
                                children = this.renderRow(headerListDefined, item, currentRoute, currentEditId, isEdit)
                                return <tr key={i+1}>{children}</tr>
                            })
                        }
                    </tbody>
                </Table>
                {
                    pagination && pagination.totalRecords > pagination.pageSize
                    ? <Pagination
                        paginationPath={paginationPath}
                        pagination={pagination}
                        onGotoPage={onGotoPage}
                    /> : null

                }
            </Fragment>
        )
    }
}

export default ItemList