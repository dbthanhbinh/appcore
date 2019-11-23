import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
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
            isShow && <div className='page-loading-item'><Spinner animation="border" variant="primary" /></div>
        )
    }
}    
export default LoadingItem
