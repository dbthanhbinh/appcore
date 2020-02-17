import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'
import { withFormBehaviors } from '../components/form/form'

import { Grid } from 'semantic-ui-react'
import CategoryList from './ItemList'
import CategoryForm from './CategoryForm'
import Utils from '../../apis/utils'
import {
    resetModelDefaultData,
    initValidatorModel,
    getInputData,
    setFieldValue,
    validatorModel,
    pickKeysFromModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

import CategoryActions from '../../store/CategoryActions'
import SeoModel from '../models/seo.model'
import CategoryModel from '../models/addCategory.model'
import {CategoryDefined, SeoDefined} from "../commons/Defined"


class Category extends Component{
    constructor(props){
        super(props)
        this.CategoryActions = new CategoryActions()
        let { models, isFormValid } = initValidatorModel(_.merge(CategoryModel.model(), SeoModel.model()))
        this.state = {
            isLoading: false,
            currentRoute: 'categories',
            isFormValid: isFormValid,
            model: models
        }
        this.pagination = Utils.resetPagination()
        this.paginationPath = '/admin/categories/paging'
        this.isEdit = false
        this.currentEditId = null        
        this.handleOnDeleteCategory = this.handleOnDeleteCategory.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnCreateCategory = this.handleOnCreateCategory.bind(this)
        this.handleOnUpdateCategory = this.handleOnUpdateCategory.bind(this)
    }

    componentDidMount(){
        // For Edit case
        let currentPage = this.pagination.currentPage
        
        let payload = {}
        let { model } = this.state
        let id = _.get(this.props, 'match.params.id')
        if(id) {
            this.isEdit = true
            this.currentEditId = id
            payload = {
                url: `Category/getCategoriesWithEdit/${id}`
            }
            this.CategoryActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                
                // Mapping data
                this.setState((prevState)=>{
                    let keysFromSeoModel = pickKeysFromModel(SeoModel.model())
                    let keysFromCatModel = pickKeysFromModel(CategoryModel.model())
                    let categoryData = _.pick(_.get(resultData, 'category'), keysFromCatModel)
                    let seoData = _.pick(_.get(resultData, 'category.seo'), keysFromSeoModel)
                    let result = _.merge(categoryData, seoData)
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))

                    let categoryList = _.get(resultData, 'categoryList')
                    if(categoryList){
                        let {data, paging} = categoryList
                        this.props.detailCategoryWithEdit({
                            category: categoryData,
                            seo: seoData,
                            categoryList: data
                        })
                        this.pagination = Utils.mapPaginationValue(paging)
                    }
                    return { model: models, isFormValid }
                })
            })
        }
        
        // For get all case
        if(!this.isEdit) {
            this.filterCategoryWithPaging(currentPage)
        }
    }

    filterCategoryWithPaging = (currentPage) => {
        this.CategoryActions = new CategoryActions()
        let pageSize = this.pagination.pageSize
        let payload = {
            url: `Category/filterCategoryWithPaging/${pageSize}/${currentPage}`,
            body: {}
        }
        this.CategoryActions.getListItems(payload, (err, result)=> {
            if(err) return
            let {data, paging} = result ? Utils.getResTaskApi(result) : null
            if(data){
                let resultData = Utils.sortList(data, 'desc')  // To sort list
                this.props.fetchCategory(resultData)
                this.pagination = Utils.mapPaginationValue(paging)
                this.setState({isLoading: false})
            }
        })
    }

    handleOnGotoPage = (page) => {
        this.filterCategoryWithPaging(page)
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleOnCreateCategory(e, data){
        this.setState({isLoading: true})

        let { model, isFormValid } = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Category/createCategory',
                body: { 
                    Name: model[CategoryDefined.NAME].value,
                    Slug: model[CategoryDefined.SLUG].value,
                    ParentId: model[CategoryDefined.PARENTID].value,

                    SeoTitle: model[SeoDefined.SEOTITLE].value,
                    SeoKeys: model[SeoDefined.SEOKEYS].value,
                    SeoDescription: model[SeoDefined.SEODESCRIPTION].value,
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.CategoryActions.addItem(payload, (err, result)=> {
                    if(err) return
                    let categoryData = _.get(Utils.getResApi(result), 'categoryData')
                    if(result) this.props.addCategory(categoryData)

                    this.setState((prevState)=>{
                        let { models, isFormValid } = initValidatorModel(resetModelDefaultData(_.merge(CategoryModel.model(), SeoModel.model())))
                        return { model: models, isFormValid, isLoading: false }
                    })
                })
            }
        }
    }

    handleOnUpdateCategory(id){
        if(!id) return
        this.setState({isLoading: true})

        let { model } = this.state
        let payload = {
            url: 'Category/updateCategory',
            body: {
                Name: model.name.value,
                Slug: model.slug.value,
                ParentId: model.parentId.value,
                Id: id,
                
                SeoTitle: model[SeoDefined.SEOTITLE].value,
                SeoKeys: model[SeoDefined.SEOKEYS].value,
                SeoDescription: model[SeoDefined.SEODESCRIPTION].value,
            }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.CategoryActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result) this.props.updateCategory(Utils.getResApi(result))

                this.setState((prevState)=>{
                    return { isLoading: false }
                })
            })
        }
    }

    handleOnDeleteCategory(id){
        if(!id) return
        let payload = {
            url: 'Category/deleteCategory',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.CategoryActions.deleteItem(payload, (err, result)=> {
                if(err) return
                if(result && result.apiResult !== 'ApiError' && result.message === null)
                    this.props.deleteCategory(id)
            })
        }
    }

    render(){
        let { currentRoute, model, isFormValid, isLoading } = this.state
        let { categoryData } = this.props
        let { categoryList, detailData } = categoryData
        return (
            <Fragment>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={6}>
                            <CategoryForm
                                isLoading={isLoading}
                                isFormValid={isFormValid}
                                isEdit={ this.isEdit }
                                currentEditId={this.currentEditId}
                                model={ model }
                                listItems={ categoryList }
                                detailData={ detailData }
                                onCreateCategory={this.handleOnCreateCategory}
                                onUpdateCategory = { this.handleOnUpdateCategory }
                                onInputChange={this.handleOnInputChange}
                                currentRoute={currentRoute}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <CategoryList
                                isEdit={this.isEdit}
                                isFormValid={isFormValid}
                                currentEditId={this.currentEditId}
                                listItems={categoryList}
                                onDeleteItem={this.handleOnDeleteCategory}
                                currentRoute={currentRoute}
                                paginationPath={this.paginationPath}
                                pagination={this.pagination}
                                onGotoPage = {this.handleOnGotoPage}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { categoryData } = state.categoryData
    return { categoryData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withFormBehaviors(Category, null))

