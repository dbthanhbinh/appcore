import React from 'react'
import {Form} from 'semantic-ui-react'

const BuildTextField = (props) => {
    let {name, onChange, modelField, type} = props
    let { value, isValid, message, label } = modelField
    const className = isValid ? 'field-valid' : 'field-invalid'
    return (
        <React.Fragment>
            {/* <label>{label}</label>
            <input type={type || 'text'}
                className={className}
                placeholder={label}
                name={name}
                onChange={onChange}
                defaultValue={value}
            />
            { !isValid && <span className='field-invalid-message'>{message}</span> } */}

            <Form.Input
                error={message || null}
                fluid
                name={name}
                type={type || 'text'}
                className={className}
                label={label}
                onChange={onChange}
                placeholder={label}
                defaultValue={value}
            />

        </React.Fragment>
    )
}
export default BuildTextField