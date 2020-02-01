import React from 'react'

const BuildTextAreaField = (props) => {
    let {name, onChange, modelField} = props
    let { value, isValid, message, label } = modelField
    const className = isValid ? 'field-valid' : 'field-invalid'
    return (
        <React.Fragment>
            <label>{label}</label>
            <textarea
                className={className}
                placeholder={label}
                name={name}
                onChange={onChange} value={value || ''} />
            { !isValid && <span className='field-invalid-message'>{message}</span> }

        </React.Fragment>
    )
}
export default BuildTextAreaField