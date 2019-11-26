import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Button } from 'semantic-ui-react'
import CustomOptions from '../form/CustomOptions'
import { withFormBehaviors } from '../form/form'

import SeoForm from '../seos/SeoForm'
import SeoModel from '../models/seo.model'
import { CategoryDefined } from "../commons/Defined"
import CategoryModel from '../models/addCategory.model'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        const Model = _.merge(CategoryModel.model(), SeoModel.model())
        this.state = {
            isLoading: false,
            model: Model
        }
    }

    render(){
        let { detailData, isEdit, items, currentEditId } = this.props
        let { model } = this.state
        let nameValue = _.get(model, `${CategoryDefined.NAME}.value`)
        let slugValue = _.get(model, `${CategoryDefined.SLUG}.value`)
        let parentIdValue = _.get(model, `${CategoryDefined.PARENTID}.value`)

        let nameLabel = _.get(model, `${CategoryDefined.NAME}.label`)
        let slugLabel = _.get(model, `${CategoryDefined.SLUG}.label`)
        // let parentIdLabel = _.get(model, `${CategoryDefined.PARENTID}.label`)

        return(
            <Fragment>
                <a href='admin/categories'>Add new</a>
                <Form>
                    <Form.Field>
                        <input type='text'
                            placeholder={nameLabel}
                            name='name'
                            onChange={this.props.onInputChange}
                            defaultValue={ nameValue }
                        />
                    </Form.Field>
                    <Form.Field>
                        <input type='text'
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