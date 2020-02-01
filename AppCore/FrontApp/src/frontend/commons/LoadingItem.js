import React, { Component } from 'react'
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import './loading.scss'

class LoadingItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShow: true
        }
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
