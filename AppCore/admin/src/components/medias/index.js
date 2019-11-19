import React, { Fragment, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Media'
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import MediaActions from '../../store/MediaActions'
import MediaItem from './mediaItem'
import Utils from '../commons/utils'

class Media extends Component {
    constructor(props){
        super(props)
        this.MediaActions = new MediaActions()
        this.state = {
            file: null
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this)
    }

    componentDidMount(){
        let payload = {
            url: 'SimCard/importFromExcelFile',
            body: {}
        }
        this.MediaActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = result ? Utils.getResApi(result) : null
            if(resultData)
                this.props.fetchMedia(resultData)
            this.setState({isLoading: false})
        })
    }

    handleOnChangeFile(e){
        if(e && e.target && e.target.value){
            this.setState({ file: e.target.files[0] })
        }
    }

    handleSubmitForm(e){
        let { file } = this.state
        let payload = {}
        payload = {
            url: 'Media/createMedia',
            body: { File: file }
        }

        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({ isLoading: false, isShowModal: false }), ()=>{
                this.MediaActions.addItemWithForm(payload, (err, result) => {
                    if(err) return
                    let mediaData = Utils.getResTaskApi(result)
                    if(result) this.props.addMedia(mediaData)
                })
            })
        }
    }

    render(){
        let mediaList = _.get(this.props, 'mediaData.mediaList')
        return(
            <Fragment>
                <h5>Media</h5>
                <div className='media-header'>
                    <Form.Control type='file' name='file' id='file' onChange={ this.handleOnChangeFile } />
                    <Form.Group>
                        <Button variant="primary" type="button" onClick={this.handleSubmitForm}>Submit</Button>
                    </Form.Group>
                </div>
                <div className='media-list'>
                    { mediaList && mediaList.map((item) => {
                    return <li key={ item.id }>
                            <MediaItem item={item} />
                        </li>
                    }) }
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { mediaData } = state.mediaData
    return { mediaData }
}
export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Media)