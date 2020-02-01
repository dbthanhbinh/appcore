import React, { Fragment } from 'react'
import { Image } from 'semantic-ui-react'

const uploadedFolder = 'Uploads'

const FieldFile = (props) => {
    let {name, id, type, mediaThumbnail, onHandleRemoveThumbnail, onInputChange, isShowPreview} = props
    let _src = (mediaThumbnail && mediaThumbnail.path) ? `${uploadedFolder}/${mediaThumbnail.path}` : null
    return(
        <Fragment>
            {
                isShowPreview
                ? <div className='preview-article-thumbnail'>
                    <div className='preview-thumb'>
                        <Image src={_src} />
                    </div>
                    <div className='preview-thumb-remove-btn'>
                        <label onClick={onHandleRemoveThumbnail}>Remove thumbnail</label>
                    </div>
                </div>
                : <input type={ type || 'file' } name={ name || 'file' } id={ id || 'file' } onChange={onInputChange} />
            }
        </Fragment>
    )
}
export default FieldFile