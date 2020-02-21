import React, { Component } from 'react'
import _ from 'lodash'
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
        eventEmitter.on('handle-loading-data', this.handleSubmitFormDataEvent)
        //eventEmitter.on('handle-loading-list-simcart', this.handleSubmitFormDataEvent)
    }
    render(){
        let { isShow } = this.state
        return(
            isShow && <div className='page-loading-overlay'>
                <i className="fas fa-circle-notch"></i>
            </div>
        )
    }
}    
export default Loading
