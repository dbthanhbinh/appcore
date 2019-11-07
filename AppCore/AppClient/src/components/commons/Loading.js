import React, { Component } from 'react'
import _ from 'lodash'
import { Spinner } from 'react-bootstrap'
import eventEmitter from '../../utils/eventEmitter'
import './loading.scss'

class Loading extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShow: false
        }
        this.handleSubmitFormDataEvent = this.handleSubmitFormDataEvent.bind(this)
    }

    handleSubmitFormDataEvent(payload){
        if(!_.isNull(payload) && !_.isEmpty(payload)){
            this.setState(()=>({
                isShow: payload.isLoading
            }))
        }
    }

    componentDidMount(){
        eventEmitter.on('handle-submit-form-data', this.handleSubmitFormDataEvent)
    }
    render(){
        let { isShow } = this.state
        return(
            isShow && <div className='page-loading-overlay'><Spinner animation="border" variant="primary" /></div>
        )
    }
}    
export default Loading
