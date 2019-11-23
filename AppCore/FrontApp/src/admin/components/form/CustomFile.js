import React, { Component, Fragment } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'

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