import React from 'react'
import _ from 'lodash'

const withFormBehaviors = (WrappedComponent, rawModel) => {
    const getInputData = (e, data) => {
        let target = e ? e.target : {}
        let name = target && target.name ? target.name : (data && data.name ? data.name : '')
        let value = target && target.value ? target.value : (data && data.value ? data.value : '')
        let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
        let type = target && target.type ? target.type : (data && data.type ? data.type : '')
        if (type === 'checkbox') value = checked ? 1 : 0
        return { name, value }
    }

    // validate per field
    // const _validate = (field, value) => {
    //     if(!field.validators || field.validators.length === 0) return
    //     field.validators.map((compare, message) => {
    //         const validate = typeof compare === 'string' ? field.validators[compare] : compare
    //     })
    // }

    return class extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                model: rawModel ? rawModel.model.bind(this)() : {}
            }
            this.handleInputChange = this.handleInputChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        setFieldValue(name, value, obj){
            obj.model[name].value = value
            return obj.model
        }

        handleInputChange = (e, data) => {
            let { name, value } = getInputData(e, data)
            this.setState((prevState)=>{
                return { model: this.setFieldValue(name, value, prevState) }
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