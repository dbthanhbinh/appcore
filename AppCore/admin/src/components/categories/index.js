import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'

import { Row, Col } from 'react-bootstrap'
import CategoryList from './ItemList'
import CategoryForm from './form'
import Utils from '../commons/utils'
import {
    getItemList,
    addCategory,
    deleteCategory,
    updateCategory,
    detailCategoryWithEdit
 } from '../../store/CategoryActions'
import { getInputData, setFieldValue, mappingModelDefaultData, validatorModel, pickKeysFromModel } from '../form/FormUtils'
import CatModel from '../models/addCategory.model'
import SeoModel from '../models/seo.model'
import { CategoryDefined, SeoDefined } from '../commons/Defined'
import { withFormBehaviors } from '../form/form'

class Category extends Component{
    constructor(props){
        super(props)
        let Model = _.merge(CatModel.model(), SeoModel.model())
        this.state = {
            currentRoute: 'categories',
            model: Model
        }
        this.isEdit = false
        this.handleOnCreateCategory = this.handleOnCreateCategory.bind(this)
        this.handleOnDeleteCategory = this.handleOnDeleteCategory.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnUpdateCategory = this.handleOnUpdateCategory.bind(this)
    }

    

    componentDidMount(){
        // For Edit case
        let payload = {}
        let id = _.get(this.props, 'match.params.id')
        if(id) {
            this.isEdit = true
            let { model } = this.state
            payload = {
                url: `Category/getCategoriesWithEdit/${id}`
            }

            detailCategoryWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                
                // Mapping data
                this.setState((prevState)=>{
                    let data = _.get(resultData, 'result')
                    let keysFromSeoModel = pickKeysFromModel(SeoModel.model())
                    let keysFromCatModel = pickKeysFromModel(CatModel.model())
                    let categoryData = _.pick(_.get(data, 'category'), keysFromCatModel)
                    let seoData = _.pick(_.get(data, 'seo'), keysFromSeoModel)
                    let result = _.merge(categoryData, seoData)
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    this.props.detailCategoryWithEdit(data)
                    return { model: models, isFormValid }
                })
            })
        }
        
        // // For get all case
        if(!this.isEdit) {
            payload = {
                url: 'Category/getAllCategory',
                body: {}
            }
            getItemList(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                resultData = Utils.sortList(resultData, 'desc')  // To sort list
                this.props.fetchCategory(resultData)
            })
        }
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            return { model: setFieldValue(name, value, prevState) }
        })
    }

    handleOnDeleteCategory(id){
        if(!id) return
        let payload = {
            url: 'Category/deleteCategory',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            deleteCategory(payload, (err, result)=> {
                if(err) return
                if(!err && result) this.props.deleteCategory(id)
            })
        }
    }

    handleOnCreateCategory(e, data){
        let { model } = this.state
        let {isFormValid} = this.props
        isFormValid = true
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
                addCategory(payload, (err, result)=> {
                    if(err) return
                    let categoryData = _.get(Utils.getResApi(result), 'categoryData')
                    if(result) this.props.addCategory(categoryData)
                })
            }
        }
    }

    handleOnUpdateCategory(id){
        if(!id) return
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
            updateCategory(payload, (err, result)=> {
                if(err) return
                if(result) this.props.updateCategory(Utils.getResApi(result))
            })
        }
    }

    render(){
        let { categoryData } = this.props
        let { currentRoute, model } = this.state
        return (
            <Fragment>
                <Row>
                    <Col md={5}>
                        <CategoryForm
                            isEdit={ this.isEdit }
                            model={model}
                            items={ categoryData && categoryData.categoryList }
                            detailData={ categoryData && categoryData.detailData }
                            onCreateCategory={ this.handleOnCreateCategory }
                            onInputChange = { this.handleOnInputChange }
                            OnUpdateCategory = { this.handleOnUpdateCategory }
                        />
                    </Col>
                    <Col md={7}>
                        <CategoryList
                            currentRoute={ currentRoute }
                            items={ categoryData && categoryData.categoryList }
                            onDeleteCategory = { this.handleOnDeleteCategory }
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { categoryData } = state
    return { categoryData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withFormBehaviors(Category, null))

