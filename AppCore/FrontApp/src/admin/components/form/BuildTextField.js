import React from 'react'

const BuildTextField = (props) => {
    let {placeholder, name, onChange, defaultValue} = props
    return (
        <React.Fragment>
            <input type='text'
                className='field-invalid'
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue}
            />
            <span className='field-invalid-message'>message</span>
        </React.Fragment>
    )
}
export default BuildTextField