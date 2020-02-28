import React, { Fragment, Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {actionCreators} from '../../store/Tag'

import Utils from '../../apis/utils'
import TagActions from '../../store/TagActions'
import DropdownWrapper from '../components/form/DropdownWrapper1'

class TagOptions extends Component {
    constructor(props){
        super(props)
        this.TagActions = new TagActions()
        this.state = {}
    }

    componentDidMount() {
        let payload = {
            url: 'Tag/getAllTag',
            body: {}
        }
        this.TagActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            resultData = Utils.sortList(resultData, 'desc')  // To sort list
            this.props.fetchTag(resultData)
        })
    }

    render(){
        let { tagData, onInputChange, name } = this.props
        let tagList = _.get(tagData, 'tagList')
        return(
            <DropdownWrapper
                placeholder={'Select tags'}
                name={name}
                multiple={true}
                onChange={onInputChange}
                options={tagList}
            />
        )
    }
}

function mapStateToProps(state){
    let { tagData } = state.tagData
    return { tagData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(TagOptions)