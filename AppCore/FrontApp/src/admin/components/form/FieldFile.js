import React, { Component, Fragment } from 'react'
import { Image } from 'semantic-ui-react'

const uploadedFolder = 'Uploads'

class FieldFile extends Component {
    constructor(props){
        super(props)
        this.state = {
            removedThumbnailAndChange: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveThumbnailAndChange = this.handleRemoveThumbnailAndChange.bind(this)
    }

    handleChange(e, data)
    {
        this.props.onInputChange(e, data)
    }

    handleRemoveThumbnailAndChange(){
        this.setState({removedThumbnailAndChange: true})
    }

    componentDidMount(){}

    render(){
        let {removedThumbnailAndChange} = this.state
        let { name, id, type, mediaThumbnail } = this.props
        return(
            <Fragment>
                {
                    removedThumbnailAndChange || !mediaThumbnail || !mediaThumbnail.path
                    ? <input type={ type || 'file' } name={ name || 'file' } id={ id || 'file' } onChange={ this.handleChange } />
                    : <div className='preview-article-thumbnail'>
                        <div className='preview-thumb'>
                            <Image src={`${uploadedFolder}/${mediaThumbnail.path}`} />
                        </div>
                        <div className='preview-thumb-remove-btn'>
                            <label onClick={this.handleRemoveThumbnailAndChange}>Remove thumbnail</label>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}
export default FieldFile