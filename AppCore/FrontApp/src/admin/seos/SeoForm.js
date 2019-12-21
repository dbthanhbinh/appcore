import React, { Component } from 'react'
import _ from 'lodash'
import { Form } from 'semantic-ui-react'
import { SeoDefined } from '../commons/Defined'
import BuildTextField from '../components/form/BuildTextField'
import BuildTextAreaField from '../components/form/BuildTextAreaField'

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
                    <BuildTextField
                        name={SeoDefined.SEOTITLE}
                        onChange={this.handleOnInputChange}
                        modelField={model[SeoDefined.SEOTITLE]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        name={SeoDefined.SEOKEYS}
                        onChange={this.handleOnInputChange}
                        modelField={model[SeoDefined.SEOKEYS]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextAreaField
                        name={SeoDefined.SEODESCRIPTION}
                        onChange={this.handleOnInputChange}
                        modelField={model[SeoDefined.SEODESCRIPTION]}
                    />
                </Form.Field>
            </React.Fragment>
        )
    }
}
export default SeoForm