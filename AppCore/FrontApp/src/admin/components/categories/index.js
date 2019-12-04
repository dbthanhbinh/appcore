import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Category'

import { Grid } from 'semantic-ui-react'
import CategoryList from './ItemList'
import CategoryForm from './CategoryForm'
import Utils from '../../../apis/utils'
import { getInputData, setFieldValue, mappingModelDefaultData, validatorModel, pickKeysFromModel }
from '../../../utils/FormUtils'
import CatModel from '../models/addCategory.model'
import SeoModel from '../models/seo.model'
import { CategoryDefined, SeoDefined } from '../commons/Defined'
import { withFormBehaviors } from '../form/form'
import CategoryActions from '../../../store/CategoryActions'

class Category extends Component{
    constructor(props){
        super(props)
        this.CategoryActions = new CategoryActions()
        let Model = _.merge(CatModel.model(), SeoModel.model())
        this.state = {
            currentRoute: 'categories',
            model: Model
        }
        this.isEdit = false
        
        this.handleOnDeleteCategory = this.handleOnDeleteCategory.bind(this)
    }

    componentDidMount(){
        // // For Edit case
        let payload = {}
        let id = _.get(this.props, 'match.params.id')
        if(id) {
            this.isEdit = true
            let { model } = this.state
            payload = {
                url: `Category/getCategoriesWithEdit/${id}`
            }

            this.CategoryActions.detailItemWithEdit(payload, (err, result)=> {
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
            this.CategoryActions.getListItems(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                resultData = Utils.sortList(resultData, 'desc')  // To sort list
                this.props.fetchCategory(resultData)
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
                if(!err && result) this.props.deleteCategory(id)
            })
        }
    }

    render(){
        let { categoryData } = this.props
        let { currentRoute, model } = this.state
        let {categoryList, detailData} = categoryData
        let catId = _.get(detailData, 'category.id')
        return (
            <Fragment>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={6}>
                            <CategoryForm
                                isEdit={ this.isEdit }
                                currentEditId={catId}
                                model={ model }
                                listItems={ categoryList }
                                detailData={ detailData }
                                onAddCategory={this.props.addCategory}
                                onUpdateCategory = { this.props.updateCategory }
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <CategoryList
                                isEdit={this.isEdit}
                                currentEditId={catId}
                                currentRoute={currentRoute}
                                listItems={categoryList}
                                onDeleteCategory = {this.handleOnDeleteCategory}
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
)(Category)

