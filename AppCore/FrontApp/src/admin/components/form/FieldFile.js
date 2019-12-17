import React, { Component, Fragment } from 'react'

class FieldFile extends Component {
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
                <input type={ type || 'file' } name={ name || 'file' } id={ id || 'file' } onChange={ this.handleChange } />
            </Fragment>
        )
    }
}
export default FieldFile