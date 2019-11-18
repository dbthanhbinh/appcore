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

    componentDidMount(){
        // let payload = {
        //     url: 'SimCard/getAll',
        //     body: {}
        // }
        // this.CategoryActions.getListItems(payload, (err, result)=> {
        //     if(err) return
        //     let resultData = Utils.getResApi(result)
        //     resultData = Utils.sortList(resultData, 'desc')  // To sort list
        //     this.props.fetchCategory(resultData)
        // })
    }

    render(){
        return(
            <React.Fragment>
                <span>Hom page</span>
                <ItemList />
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