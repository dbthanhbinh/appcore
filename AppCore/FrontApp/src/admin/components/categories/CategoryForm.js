import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import { withFormBehaviors } from '../form/form'

import SeoModel from '../models/seo.model'
import CategoryModel from '../models/addCategory.model'
import CustomOptions from '../form/CustomOptions'
import SeoForm from '../seos/SeoForm'
import {CategoryDefined, SeoDefined} from "../commons/Defined"

import BuildTextField from '../form/BuildTextField'
import {getInputData, setFieldValue, validatorModel} from '../../../utils/FormUtils'
import { getDefaultEmptyGuid } from '../../../utils/commons'
import Utils from '../../../apis/utils'
import CategoryActions from '../../../store/CategoryActions'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.CategoryActions = new CategoryActions()
        let { models, isFormValid } = validatorModel(_.merge(CategoryModel.model(), SeoModel.model()))
        this.state = {
            isFormValid: isFormValid,
            isLoading: false,
            model: models
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnCreateCategory = this.handleOnCreateCategory.bind(this)
        this.handleOnUpdateCategory = this.handleOnUpdateCategory.bind(this)
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid }
        })
    }

    handleOnCreateCategory(e, data){
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
                    if(result) this.props.onAddCategory(categoryData)
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
            this.CategoryActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result) this.props.onUpdateCategory(Utils.getResApi(result))
            })
        }
    }

    render(){
        let { detailData, isEdit, listItems, currentEditId } = this.props
        let { model, isFormValid } = this.state
        let parentIdValue = _.get(model, `${CategoryDefined.PARENTID}.value`) || getDefaultEmptyGuid()
        return(
            <Fragment>
                <a href='admin/categories'>Add new</a>
                <Form>
                    <Form.Field>
                        <BuildTextField
                            name={CategoryDefined.NAME}
                            onChange={this.handleOnInputChange}
                            modelField={model[CategoryDefined.NAME]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={CategoryDefined.SLUG}
                            onChange={this.handleOnInputChange}
                            modelField={model[CategoryDefined.SLUG]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <CustomOptions
                            isEdit={isEdit}
                            currentCatId={currentEditId}
                            categoryList={listItems}
                            name='parentId'
                            parentId={parentIdValue}
                            onInputChange={this.handleOnInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <SeoForm
                            model={model}
                            seoData={ _.get(detailData, 'seo') }
                            onInputChange = { this.handleOnInputChange } />
                    </Form.Field>
                    <Form.Field>
                        <Button variant="primary"
                            disabled={!isFormValid}
                            onClick={isEdit ? () => this.handleOnUpdateCategory(currentEditId) : this.handleOnCreateCategory} >
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default withFormBehaviors(CategoryForm, null)