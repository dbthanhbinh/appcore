import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Button } from 'react-bootstrap'
import CustomOptions from '../form/CustomOptions'
import SeoForm from '../seos/SeoForm'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let { detailData, isEdit, items, model } = this.props
        let catName = _.get(model, 'name.value')
        let catSlug = _.get(model, 'slug.value')
        let catId = _.get(detailData, 'category.id')
        let catParentId = _.get(model, 'parentId.value')
        return(
            <Fragment>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                            placeholder='Category name'
                            name='name'
                            onChange={this.props.onInputChange}
                            defaultValue={ catName }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                            placeholder='Category slug'
                            name='slug'
                            onChange={this.props.onInputChange}
                            defaultValue={ catSlug }
                        />
                    </Form.Group>
                    <Form.Group>
                        <CustomOptions
                            isEdit={isEdit}
                            currentCatId={catId}
                            categoryList={ items }
                            name='parentId'
                            parentId={ catParentId }
                            onInputChange={ this.props.onInputChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <SeoForm
                            model={model}
                            seoData={ _.get(detailData, 'seo') }
                            onInputChange = { this.props.onInputChange } />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={ isEdit ? () => this.props.OnUpdateCategory(catId) : this.props.onCreateCategory }>
                            Save Changes
                        </Button>
                    </Form.Group>
                </Form>
            </Fragment>
        )
    }
}

export default CategoryForm