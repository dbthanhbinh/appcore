import React, { Component, Fragment } from 'react'
import { Image } from 'semantic-ui-react'
const uploadedFolder = 'Uploads'
const noImagePath = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const ImageView = (props) => {
    let { src } = props
    let _src = src ? `${uploadedFolder}/${src}` : noImagePath
    return(
        <div className='preview-thumb'>
            <Image src={_src} />
        </div>
    )
}
export default ImageView