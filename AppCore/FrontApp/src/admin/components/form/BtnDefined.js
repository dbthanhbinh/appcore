import React from 'react'
import _ from 'lodash'
import { Button } from 'semantic-ui-react'

export const BtnAddNew = (props) => {
    let {currentRoute} = props
    return <a href={`admin/${currentRoute}`}>Add new</a>
}

export const BtnWithModalEvent = (props) => {
    let {onBtnEvent, label} = props
    return <Button onClick={onBtnEvent} variant="primary">{label || 'Add new'}</Button>
}