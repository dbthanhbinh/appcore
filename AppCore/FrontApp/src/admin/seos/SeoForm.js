import React, { Component } from 'react'
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
        return(
            <React.Fragment>
                <h5>Config SEO</h5>
                <Form.Field>
                    <BuildTextField
                        name={SeoDefined.SEOTITLE}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEOTITLE] : null}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        name={SeoDefined.SEOKEYS}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEOKEYS] : null}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextAreaField
                        name={SeoDefined.SEODESCRIPTION}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEODESCRIPTION] : null}
                    />
                </Form.Field>
            </React.Fragment>
        )
    }
}
export default SeoForm