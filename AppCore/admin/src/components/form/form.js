import React from 'react'
// import _ from 'lodash'
import { getInputData, setFieldValue } from '../form/FormUtils'

const withFormBehaviors = (WrappedComponent, rawModel) => {  
    return class extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                model: rawModel ? rawModel.model.bind(this)() : {}
            }
            this.handleInputChange = this.handleInputChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        handleInputChange = (e, data) => {
            let { name, value } = getInputData(e, data)
            this.setState((prevState)=>{
                return { model: setFieldValue(name, value, prevState) }
            })
        }

        handleSubmit(){
            
        }

        render(){
            let { model } = this.state
            return <WrappedComponent { ...this.props }
                onSubmit = { this.handleSubmit }
                isFormValid = { true }
                formData = { model }
                onInputChange={typeof this.props.onInputChange === 'function' ? this.props.onInputChange : this.handleInputChange}
            />
        }
    }
}

export { withFormBehaviors }