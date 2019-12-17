import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import DropdownAsEdit from '../form/DropdownAsEdit'
import SeoForm from '../seos/SeoForm'
import { CategoryDefined } from "../commons/Defined"

import BuildTextField from '../form/BuildTextField'
import { getDefaultEmptyGuid } from '../../../utils/commons'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let {
            detailData,
            isEdit,
            listItems,
            currentEditId,
            model,
            isFormValid,
            onInputChange,
            onUpdateCategory,
            onCreateCategory
        } = this.props

        let parentIdValue = _.get(model, `${CategoryDefined.PARENTID}.value`) || getDefaultEmptyGuid()
        return(
            <Fragment>
                <a href='admin/categories'>Add new</a>
                <Form>
                    <Form.Field>
                        <BuildTextField
                            name={CategoryDefined.NAME}
                            onChange={onInputChange}
                            modelField={model[CategoryDefined.NAME]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={CategoryDefined.SLUG}
                            onChange={onInputChange}
                            modelField={model[CategoryDefined.SLUG]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <DropdownAsEdit
                            isEdit={isEdit}
                            currentCatId={currentEditId}
                            categoryList={listItems}
                            name='parentId'
                            parentId={parentIdValue}
                            onInputChange={onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <SeoForm
                            model={model}
                            seoData={ _.get(detailData, 'seo') }
                            onInputChange = {onInputChange} />
                    </Form.Field>
                    <Form.Field>
                        <Button variant="primary"
                            disabled={!isFormValid}
                            onClick={isEdit ? () => onUpdateCategory(currentEditId) : onCreateCategory} >
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default CategoryForm