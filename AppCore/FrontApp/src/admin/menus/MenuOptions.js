import React, { Fragment, Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'

import Utils from '../../apis/utils'
import CategoryActions from '../../store/CategoryActions'
import DropdownWrapper from '../components/form/DropdownWrapper'

class CategoryOptions extends Component {
    constructor(props){
        super(props)
        this.CategoryActions = new CategoryActions()
        this.state = {}
    }

    componentDidMount() {
        let payload = {
            url: 'Category/getAllCategory',
            body: {}
        }
        this.CategoryActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            resultData = Utils.sortList(resultData, 'desc')  // To sort list
            this.props.fetchCategory(resultData)
        })
    }

    render(){
        let { categoryData, onInputChange, name } = this.props
        let categoryList = _.get(categoryData, 'categoryList')
        let placeholder = 'Select categories'

        let mapOptions = []
        categoryList && categoryList.forEach(item => {
            mapOptions.push({
                key: item.id,
                text: `${item.name}`,
                value: item.id
            })
        })
        
        return(
            <DropdownWrapper
                placeholder={placeholder}
                name={name}
                multiple={false}
                onChange={onInputChange}
                options={mapOptions}
            />
        )
    }
}

function mapStateToProps(state){
    let { categoryData } = state.categoryData
    return { categoryData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryOptions)