import React, {Fragment} from 'react'
import _ from 'lodash'
import { getDefaultEmptyGuid } from '../../../utils/commons'

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
    let {value} = modelField
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

    let {value} = modelField
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
        label,
        formGroupClass,
        defaultValue,
        placeholder,
        listItems,
        currentCatId,
        onChange
    } = props
    formGroupClass = `form-group ${formGroupClass || ''}`
    return (
        name && <div className={formGroupClass}>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                name={name}
                className="form-control custom-select"
                value={defaultValue || getDefaultEmptyGuid()}
                onChange={onChange}
                >
                <option value={getDefaultEmptyGuid()} disabled>{placeholder}</option>
                {
                    listItems && !_.isEmpty(listItems)
                    && listItems.map((s, i) => {
                        let isSelectedClass = ''
                        if(s.id === currentCatId) {
                            isSelectedClass = 'isSelected'
                        }
                        return <option key={i} className={`${isSelectedClass}`} value={s.id}>{s.name}</option>
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

export function BuildFileField(props) {
    let {
        name,
        onChange,
        className
    } = props
    className = `form-control ${className || ''}`
    return (
        name && <input
            type={'file'}
            id={name} name={name}
            className={className}
            onChange={onChange || null}
        />
    )
}

export function BuildLabelField(props) {
    let {
        placeholder,
        value,
        formGroupClass
    } = props
    formGroupClass = `form-group ${formGroupClass || ''}`
    return (
        placeholder && <div className={formGroupClass}>
            {placeholder && <label>{placeholder}: {value}</label>}
        </div>
    )
}