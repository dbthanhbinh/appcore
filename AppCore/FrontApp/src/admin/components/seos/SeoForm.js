import React, { Component } from 'react'
import _ from 'lodash'
import { Form } from 'semantic-ui-react'
import { SeoDefined } from '../commons/Defined'

class SeoForm extends Component {
    constructor(props){
        super(props)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    handleOnInputChange(e, data){
        this.props.onInputChange(e, data)
    }

    render(){
        let { model } = this.props
        let seoTitleLabel = _.get(model, `${SeoDefined.SEOTITLE}.label`)
        let seoKeysLabel = _.get(model, `${SeoDefined.SEOKEYS}.label`)
        let seoDescriptionLabel = _.get(model, `${SeoDefined.SEODESCRIPTION}.label`)

        let seoTitle = _.get(model, `${SeoDefined.SEOTITLE}.value`) || ''
        let seoKeys = _.get(model, `${SeoDefined.SEOKEYS}.value`) || ''
        let seoDescription = _.get(model, `${SeoDefined.SEODESCRIPTION}.value`) || ''
        
        return(
            <React.Fragment>
                <h5>Config SEO</h5>
                <Form.Field>
                    <input type='text' name={ SeoDefined.SEOTITLE }
                        onChange={this.handleOnInputChange} value={ seoTitle } placeholder={ seoTitleLabel }
                    />
                </Form.Field>
                <Form.Field>
                    <input type='text' name={ SeoDefined.SEOKEYS }
                        onChange={this.handleOnInputChange} value={ seoKeys } placeholder={ seoKeysLabel }
                    />
                </Form.Field>
                <Form.Field>
                    <input as="textarea" rows="4" name={ SeoDefined.SEODESCRIPTION }
                        placeholder={ seoDescriptionLabel } onChange={this.handleOnInputChange} value={ seoDescription } />
                </Form.Field>
            </React.Fragment>
        )
    }
}
export default SeoForm