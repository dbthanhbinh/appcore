import React from 'react'
import { Button } from 'semantic-ui-react'

export const BtnAddNew = (props) => {
    let {currentRoute} = props
    return <a href={`admin/${currentRoute}`}>Add new</a>
}

export const BtnWithModalEvent = (props) => {
    let {onBtnEvent, label, disabled} = props
    return <Button disabled={disabled} onClick={onBtnEvent} variant="primary">{label || 'Add new'}</Button>
}