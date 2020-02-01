import React from 'react'
import { Message } from 'semantic-ui-react'

const AlertCP = props => {
    let { variant, content } = props
    return content ? <Message key={variant} variant={variant}>{content}</Message> : null
}
export default AlertCP
