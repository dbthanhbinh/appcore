import React from 'react'
import { Image } from 'semantic-ui-react'
const uploadedFolder = 'Uploads'
const noImagePath = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const ImageView = (props) => {
    let { src, className } = props
    let _src = src ? `${uploadedFolder}/${src}` : noImagePath
    let _className = className ? className : 'preview-thumb'
    return(
        <div className={_className}>
            <Image src={_src} />
        </div>
    )
}
export default ImageView