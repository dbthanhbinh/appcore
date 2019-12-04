import React from 'react'

const BuildTextField = (props) => {
    let {name, onChange, modelField} = props
    let { value, isValid, message, label } = modelField
    const className = isValid ? 'field-valid' : 'field-invalid'
    return (
        <React.Fragment>
            <input type='text'
                className={className}
                placeholder={label}
                name={name}
                onChange={onChange}
                defaultValue={value}
            />
            { !isValid && <span className='field-invalid-message'>{message}</span> }

        </React.Fragment>
    )
}
export default BuildTextField