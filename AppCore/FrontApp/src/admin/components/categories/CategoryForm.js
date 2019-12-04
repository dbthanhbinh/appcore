import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import { withFormBehaviors } from '../form/form'

import SeoModel from '../models/seo.model'
import CategoryModel from '../models/addCategory.model'
import CustomOptions from '../form/CustomOptions'
import SeoForm from '../seos/SeoForm'
import { CategoryDefined } from "../commons/Defined"

import BuildTextField from '../form/BuildTextField'
import { initValidatorModel } from '../../../utils/FormUtils'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)

        let { models, isFormValid } = initValidatorModel(_.merge(CategoryModel.model(), SeoModel.model()))
        this.state = {
            isLoading: false,
            model: models
        }
    }

    initModel(){
        return _.merge(CategoryModel.model(), SeoModel.model())  // init model category form
    }

    render(){
        let { detailData, isEdit, items, currentEditId } = this.props
        let { model } = this.state
        let nameValue = _.get(model, `${CategoryDefined.NAME}.value`) || ''
        let slugValue = _.get(model, `${CategoryDefined.SLUG}.value`) || ''
        let parentIdValue = _.get(model, `${CategoryDefined.PARENTID}.value`) || ''

        let nameLabel = _.get(model, `${CategoryDefined.NAME}.label`)
        let slugLabel = _.get(model, `${CategoryDefined.SLUG}.label`)
        // let parentIdLabel = _.get(model, `${CategoryDefined.PARENTID}.label`)
        console.log('====', model)
        return(
            <Fragment>
                <a href='admin/categories'>Add new</a>
                <Form>
                    <Form.Field>
                        <BuildTextField
                            placeholder={nameLabel}
                            name='name'
                            onChange={this.props.onInputChange}
                            defaultValue={ nameValue }
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            placeholder={slugLabel}
                            name='slug'
                            onChange={this.props.onInputChange}
                            defaultValue={ slugValue }
                        />
                    </Form.Field>
                    <Form.Field>
                        <CustomOptions
                            isEdit={isEdit}
                            currentCatId={currentEditId}
                            categoryList={ items }
                            name='parentId'
                            parentId={ parentIdValue }
                            onInputChange={ this.props.onInputChange }
                        />
                    </Form.Field>
                    <Form.Field>
                        <SeoForm
                            model={model}
                            seoData={ _.get(detailData, 'seo') }
                            onInputChange = { this.props.onInputChange } />
                    </Form.Field>
                    <Form.Field>
                        <Button variant="primary" onClick={ isEdit ? () => this.props.OnUpdateCategory(currentEditId) : this.props.onCreateCategory }>
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default withFormBehaviors(CategoryForm, null)