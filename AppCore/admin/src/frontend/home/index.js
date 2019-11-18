import React from 'react'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/BaseStore'

import ItemList from './ItemList'

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){}

    render(){
        return(
            <React.Fragment>
                Home
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    let { categoryData } = state
    return { categoryData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home)