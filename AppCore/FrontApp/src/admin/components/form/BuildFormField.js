import React, {Fragment} from 'react'
import _ from 'lodash'

export function BuildTextField(props) {
    let {
        name,
        onChange,
        label,
        formGroupClass,
        className,
        type,
        placeholder,
        modelField
    } = props
    let { value, isValid, message } = modelField
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
                    onChange={onChange || null}
                    defaultValue={value}
                />
            </div>
        </Fragment>
    )
}

export function BuildTextAreaField(props) {
    let {
        name,
        onChange,
        label,
        formGroupClass,
        className,
        rows,
        placeholder,
        modelField
    } = props

    let { value, isValid, message } = modelField
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
                    rows={rows || 3}
                    onChange={onChange || null}
                    value={value}
                    placeholder={placeholder || ''}
                    > 
                </textarea>
            </div>
        </Fragment>
    )
}

export function BuildSelectField(props) {
    let {
        name,
        onHandleSelectedChange,
        label,
        formGroupClass,
        className,
        defaultValue,
        placeholder,
        listItems,
        currentCatId
    } = props
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
                <option value='-1' disabled>{placeholder}</option>
                {
                    listItems && !_.isEmpty(listItems)
                    && listItems.map((s, i) => {
                        let isDisabled = ''
                        let isSelectedClass = ''
                        if(s.id === currentCatId) {
                            isSelectedClass = 'isSelected'
                            isDisabled = 'disabled'
                        }
                        return <option key={i} {...isDisabled} className={`${isSelectedClass}`} value={s.id}>{s.name}</option>
                    })
                }
            </select>
        </div>
    )
}


// BTN
export function BuildButtonField(props) {
    let {name, onClick, label, className} = props
    className = `btn ${className || ''}`
    return (
        label && <input
        type='button'
        id={name} name={name}
        className={className}
        onClick={onClick || null}
        value={label}
    />
    )
}