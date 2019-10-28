import React from 'react'
// import _ from 'lodash'
import { getInputData, setFieldValue, validatorModel, validatorForm, initValidatorModel } from '../form/FormUtils'

const withFormBehaviors = (WrappedComponent, rawModel) => {  
    return class extends React.Component {
        constructor(props){
            super(props)
            let { models, isFormValid } = initValidatorModel(rawModel)
            this.state = {
                model: models,
                isFormValid
            }
            this.handleInputChange = this.handleInputChange.bind(this)
        }

        handleInputChange = (e, data) => {
            let { name, value } = getInputData(e, data)
            this.setState((prevState)=>{
                let { models, isFormValid } = validatorModel(setFieldValue(name, value, prevState))
                return { model: models, isFormValid }
            })
        }

        render(){
            let { model, isFormValid } = this.state
            return <WrappedComponent { ...this.props }
                onSubmit = { this.handleSubmit }
                isFormValid = { isFormValid }
                formData = { model }
                onInputChange={typeof this.props.onInputChange === 'function' ? this.props.onInputChange : this.handleInputChange}
            />
        }
    }
}

export { withFormBehaviors }