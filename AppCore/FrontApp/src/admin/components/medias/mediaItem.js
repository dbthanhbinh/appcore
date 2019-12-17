import React, { Fragment } from 'react'
import DetailMediaModal from './detailMediaModal'

class MediaItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenModal: false
        }
        this.handleOpenDetailMedia = this.handleOpenDetailMedia.bind(this)
        this.handleCloseDetailMedia = this.handleCloseDetailMedia.bind(this)
    }

    handleOpenDetailMedia(){
        this.setState({isOpenModal: true})
    }

    handleCloseDetailMedia(){
        this.setState({isOpenModal: false})
    }

    render(){
        let { item, onHandleUpdateMedia } = this.props
        let { isOpenModal } = this.state
        return(
            <Fragment>
                <div className='' onClick={this.handleOpenDetailMedia}>
                    <img src={`Uploads/${item.path}`} alt='' />
                    <span>{ item.name }</span>
                </div>
                <DetailMediaModal
                    imageDetail={item}
                    isOpenModal={isOpenModal}
                    onHandleCloseModal={this.handleCloseDetailMedia}
                    onHandleUpdateMedia={onHandleUpdateMedia}
                />
            </Fragment>
        )
    }
}

export default MediaItem