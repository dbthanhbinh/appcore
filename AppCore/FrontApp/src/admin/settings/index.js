import React ,{ Component } from 'react'
import { Segment, Tab, Form } from 'semantic-ui-react'
import SeoModel from '../models/seo.model'
import SeoForm from '../seos/SeoForm'
import {
    adapterMapingDropdownOption,
    getInputData,
    getEditorData,
    setFieldValue,
    validatorModel
} from '../../utils/FormUtils'

const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: (props) => <Tab.Pane>
                                                <Form>
                                                    <Form.Field>
                                                        <SeoForm
                                                            model={props.model}
                                                            seoData={null}
                                                            onInputChange={null}
                                                        />
                                                    </Form.Field>
                                                </Form>
                                            </Tab.Pane> },
]

class Setting extends Component {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(SeoModel.model())
        this.state = {
            model: models
        }
    }

    handleChange = (e, data) => this.setState(data)

    render(){
        let { model } = this.state
        return (
            <div>
              <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} model={model} onTabChange={this.handleChange} />
              <Segment tertiary>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
              </Segment>
            </div>
          )
    }
}

export default Setting