import React from 'react'
import _ from 'lodash'
import './ImageView.scss'
const uploadedFolder = 'Uploads'
const noImagePath = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const ImageView = (props) => {
    let path = _.get(props, 'media.path')
    let {className, name} = props
    let _src = path ? `${uploadedFolder}/${path}` : noImagePath
    let _className = className ? `preview-thumb-list ${className}` : 'preview-thumb-list'
    return(
        <div className={_className}>
            <img src={_src} alt={name}/>
        </div>
    )
}
export default ImageView