import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'

class customFile extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, data)
    {
        this.props.onInputChange(e, data)
    }

    componentDidMount(){}

    render(){
        let { name, id, type } = this.props        
        return(
            <Fragment>
                <Form.Control type={ type || 'file' } name={ name || 'file' } id={ id || 'file' } onChange={ this.handleChange }></Form.Control>
            </Fragment>
        )
    }
}
const CustomFile = customFile
export default connect(
    null,
    null
)(CustomFile)