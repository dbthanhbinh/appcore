import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertCP = props => {
    let { variant, content } = props
    return content ? <Alert key={variant} variant={variant}>{content}</Alert> : null
}
export default AlertCP
