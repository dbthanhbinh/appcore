import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {actionCreators} from '../../store/Tag'
import TagList from '../commons/itemList'
import TagForm from './TagForm'
import Utils from '../../apis/utils'
import ContentHeader from '../commons/ContentHeader'
import {
    initValidatorModel,
    getInputData,
    setFieldValue,
    mappingModelDefaultData,
    validatorModel,
    resetModelDefaultData,
    pickKeysFromModel
}

from '../../utils/FormUtils'
import TagModel from '../models/addTag.model'
import { TagDefined } from '../commons/Defined'
import {withFormBehaviors} from '../components/form/form'
import TagActions from '../../store/TagActions'

class Tag extends Component{
    constructor(props){
        super(props)
        this.TagActions = new TagActions()
        let { models, isFormValid } = initValidatorModel(TagModel.model())
        this.state = {
            isLoading: false,
            currentRoute: 'tags',
            isFormValid: isFormValid,
            model: models
        }
        this.type = 'general'
        this.headerName = 'Tags'
        this.pagination = Utils.resetPagination()
        this.paginationPath = '/admin/tags/paging'
        this.isEdit = false
        this.handleOnCreateTag = this.handleOnCreateTag.bind(this)
        this.handleOnDeleteTag = this.handleOnDeleteTag.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnUpdateTag = this.handleOnUpdateTag.bind(this)
        this.filterTagsWithPaging = this.filterTagsWithPaging.bind(this)
    }

    componentDidMount(){
        // For Edit case
        let payload = {}
        let id = _.get(this.props, 'match.params.id')
        const query = new URLSearchParams(this.props.location.search)
        let type = query.get('type')
        if (type) {
            this.type = type
        }
        if(id) {
            this.isEdit = true
            let { model } = this.state
            payload = {
                url: `Tag/getTagWithEdit/${id}`
            }

            this.TagActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)

                // Mapping data
                this.setState((prevState)=>{
                    let data = _.get(resultData, 'result')
                    let keysFromTagModel = pickKeysFromModel(TagModel.model())
                    let categoryData = _.pick(_.get(data, 'tag'), keysFromTagModel)
                    let result = categoryData
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    this.props.detailTagWithEdit(data)
                    return { model: models, isFormValid }
                })
            })
        }
        
        // For get all case
        if(!this.isEdit) {
            let currentPage = this.pagination.currentPage
            this.filterTagsWithPaging(currentPage)
        }
    }

    filterTagsWithPaging = (currentPage) => {
        this.TagActions = new TagActions()
        let pageSize = this.pagination.pageSize
        let payload = {
            url: `Tag/filterTags/${pageSize}/${currentPage}`,
            body: {}
        }
        this.TagActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            let {paging} = result
            resultData = Utils.sortList(resultData, 'desc')  // To sort list
            this.pagination = Utils.mapPaginationValue(paging)
            this.props.fetchTag(resultData)
        })
    }

    handleOnGotoPage = (page) => {
        this.filterTagsWithPaging(page)
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleOnDeleteTag(id){
        if(!id) return
        let payload = {
            url: 'Tag/deleteTag',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.TagActions.deleteItem(payload, (err, result)=> {
                if(err) return
                if(!err && result) this.props.deleteTag(id)
            })
        }
    }

    handleOnCreateTag(e, data){
        this.setState({isLoading: true})

        let { model } = this.state
        let {isFormValid} = this.props
        isFormValid = true
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Tag/createTag',
                body: { 
                    Name: model[TagDefined.NAME].value,
                    Slug: model[TagDefined.SLUG].value,
                    Type: this.type
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.TagActions.addItem(payload, (err, result)=> {
                    if(err) return
                    let tagData = Utils.getResApi(result)
                    if(result) this.props.addTag(tagData)
                    
                    this.setState((prevState)=>{
                        let { models, isFormValid } = validatorModel(resetModelDefaultData(TagModel.model()))
                        return { model: models, isFormValid, isLoading: false }
                    })
                })
            }
        }
    }

    handleOnUpdateTag(id){
        if(!id) return
        this.setState({isLoading: true})
        let { model } = this.state
        let payload = {
            url: 'Tag/updateTag',
            body: {
                Name: model.name.value,
                Slug: model.slug.value,
                Id: id
            }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.TagActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result)
                    this.props.updateTag(Utils.getResApi(result))
                this.setState((prevState)=>{
                    return { isLoading: false }
                })
            })
        }
    }

    render(){
        let { tagData } = this.props
        let { currentRoute, model, isLoading } = this.state
        let tagList = _.get(tagData, 'tagList')
        let detailData = _.get(tagData, 'detailData')
        let catId = _.get(detailData, 'tag.id')
        let headerListDefined = [
            {key: 'no', label: 'No', isActive: true},
            {key: 'name', label: 'Name', isActive: true},
            {key: 'alias', label: 'Alias', isActive: true},
            {key: 'actions', label: 'Actions', isActive: true}
        ]
        console.log('======', this.type)
        return (
            <Fragment>
                <ContentHeader headerName={this.headerName}/>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4">
                                <TagForm
                                    isLoading={isLoading}
                                    isEdit={ this.isEdit }
                                    currentEditId={catId}
                                    model={ model }
                                    items={ tagList }
                                    detailData={ detailData }
                                    onInputChange = { this.handleOnInputChange }
                                    onCreateTag={ this.handleOnCreateTag }                                
                                    onUpdateTag = { this.handleOnUpdateTag }
                                />
                            </div>
                            <div className="col-lg-8">
                                <TagList
                                    headerListDefined={headerListDefined}
                                    isEdit={ this.isEdit }
                                    currentEditId={catId}
                                    currentRoute={ currentRoute }
                                    items={ tagList }
                                    paginationPath={this.paginationPath}
                                    pagination={this.pagination}
                                    onGotoPage = {this.handleOnGotoPage}
                                    onDeleteTag = { this.handleOnDeleteTag }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { tagData } = state.tagData
    return { tagData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withFormBehaviors(Tag, null))

