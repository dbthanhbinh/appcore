import React, { Component } from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { PostDefined } from '../commons/Defined'

class SeoForm extends Component {
    constructor(props){
        super(props)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    handleOnInputChange(e, data){
        this.props.onInputChange(e, data)
    }

    render(){
        let { formData } = this.props
        let seo_title = _.get(formData, `${PostDefined.SEOTITLE}.label`)
        let seo_keys = _.get(formData, `${PostDefined.SEOKEYS}.label`)
        let seo_description = _.get(formData, `${PostDefined.SEODESCRIPTION}.label`)
        return(
            <React.Fragment>
                <Form.Group>
                    <Form.Control type='text' name={ PostDefined.SEOTITLE } onChange={this.handleOnInputChange} defaultValue='' placeholder={ seo_title }/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' name={ PostDefined.SEOKEYS } onChange={this.handleOnInputChange} defaultValue='' placeholder={ seo_keys } />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" rows="4" name={ PostDefined.SEODESCRIPTION } defaultValue='' placeholder={ seo_description } onChange={this.handleOnInputChange}></Form.Control>
                </Form.Group>
            </React.Fragment>
        )
    }
}
export default SeoForm