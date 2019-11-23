import React, { Fragment } from 'react'

const MediaItem = (props) => {
    let { item } = props
    return(
        <Fragment>
            <img src={`Uploads/${item.path}`} />
            <span>{ item.name }</span>
        </Fragment>
    )
}

export default MediaItem