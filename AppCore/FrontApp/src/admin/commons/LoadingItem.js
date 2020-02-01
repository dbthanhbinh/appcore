import React, { Component } from 'react'
import _ from 'lodash'
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import eventEmitter from '../../utils/eventEmitter'
import './loading.scss'

class LoadingItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShow: true
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
        eventEmitter.on('handle-loading-list-simcart', this.handleSubmitFormDataEvent)
    }
    
    render(){
        let { isShow } = this.state
        return(
            isShow &&  <Segment className='page-loading-item'>
                <Dimmer active>
                    <Loader />
                </Dimmer>
            </Segment>
        )
    }
}    
export default LoadingItem
