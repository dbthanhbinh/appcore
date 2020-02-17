import React, {Fragment} from 'react'

export function BuildTextField(props) {
    let {name, onHandleInputChange, label, formGroupClass, className, type, placeholder} = props
    formGroupClass = `form-group ${formGroupClass || ''}`
    className = `form-control ${className || ''}`
    return (
        name && <Fragment>
           <div className={formGroupClass}>
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    placeholder={placeholder}
                    type={type || 'text'}
                    id={name} name={name}
                    className={className}
                    onChange={onHandleInputChange || null}
                />
            </div>
        </Fragment>
    )
}

export function BuildTextAreaField(props) {
    let {name, onHandleEditorChange, label, formGroupClass, className, rows, placeholder} = props
    formGroupClass = `form-group ${formGroupClass || ''}`
    className = `form-control ${className || ''}`
    return (
        name && <Fragment>
           <div className={formGroupClass}>
                {label && <label htmlFor={name}>{label}</label>}
                <textarea
                    id={name}
                    name={name}
                    className={className}
                    rows={rows || 4}
                    onChange={onHandleEditorChange || null}
                    placeholder={placeholder || ''}
                    > 
                </textarea>
            </div>
        </Fragment>
    )
}

export function BuildSelectField(props) {
    let {name, onHandleSelectedChange, label, formGroupClass, className, defaultValue, placeholder} = props
    formGroupClass = `form-group ${formGroupClass || ''}`
    className = `form-control ${className || ''}`
    return (
        name && <div className={formGroupClass}>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                name={name}
                className="form-control custom-select"
                defaultValue={defaultValue || '-1'}
                onChange={onHandleSelectedChange}
                >
                <option value='-1' disabled>Select one</option>
                <option value='1'>On Hold</option>
                <option value='2'>Canceled</option>
                <option value='3'>Success</option>
            </select>
        </div>
    )
}


// BTN
export function BuildButtonField(props) {
    let {name, onHandleClick, label, className} = props
    className = `btn ${className || ''}`
    return (
        label && <input
        type='button'
        id={name} name={name}
        className={className}
        onClick={onHandleClick || null}
        value={label}
    />
    )
}