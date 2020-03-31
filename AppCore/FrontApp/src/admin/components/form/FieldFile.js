import React, { Fragment } from 'react'
const uploadedFolder = 'Uploads'

const FieldFile = (props) => {
    let {name, id, type, mediaThumbnail, onHandleRemoveThumbnail, onInputChange, isShowPreview} = props
    let _src = (mediaThumbnail && mediaThumbnail.path) ? `${uploadedFolder}/${mediaThumbnail.path}` : null
    return(
        <Fragment>
            <div className={`form-group`}>
            {
                isShowPreview
                ? <div className='preview-article-thumbnail'>
                    <div className='preview-thumb'>
                        <img src={_src} alt=''/>
                    </div>
                    <div className='preview-thumb-remove-btn'>
                        <label onClick={onHandleRemoveThumbnail}>Remove thumbnail</label>
                    </div>
                </div>
                : <input type={ type || 'file' } name={ name || 'file' } id={ id || 'file' } onChange={onInputChange} />
            }
            </div>
        </Fragment>
    )
}
export default FieldFile