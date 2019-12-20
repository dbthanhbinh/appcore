import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import DropdownWrapper from '../components/form/DropdownWrapper'
import SeoForm from '../seos/SeoForm'
import { CategoryDefined } from "../commons/Defined"

import BuildTextField from '../components/form/BuildTextField'
import { getDefaultEmptyGuid } from '../../utils/commons'
import {BtnAddNew} from '../components/form/BtnDefined'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let {
            currentRoute,
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
                <BtnAddNew currentRoute={currentRoute}/>
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
                        <DropdownWrapper
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