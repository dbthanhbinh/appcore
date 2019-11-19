import React from 'react'

const CloseCP = props => {
    let { id, content, onHandleClick } = props
    return content ? <span onClick={onHandleClick(id)}>Close</span> : null
}
export default CloseCP
