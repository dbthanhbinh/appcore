import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Tag'

import { Row, Col } from 'react-bootstrap'
import TagList from './ItemList'
import TagForm from './form'
import Utils from '../../../apis/utils'
import { getInputData, setFieldValue, mappingModelDefaultData, validatorModel }
from '../../../utils/FormUtils'
import TagModel from '../models/addTag.model'
import { TagDefined } from '../commons/Defined'
import { withFormBehaviors } from '../form/form'
import TagActions from '../../../store/TagActions'

class Tag extends Component{
    constructor(props){
        super(props)
        this.TagActions = new TagActions()
        let Model = TagModel.model()
        this.state = {
            currentRoute: 'tags',
            model: Model
        }
        this.isEdit = false
        this.handleOnCreateTag = this.handleOnCreateTag.bind(this)
        this.handleOnDeleteTag = this.handleOnDeleteTag.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnUpdateTag = this.handleOnUpdateTag.bind(this)
    }

    

    componentDidMount(){
        // // For Edit case
        let payload = {}
        let id = _.get(this.props, 'match.params.id')
        if(id) {
            this.isEdit = true
            let { model } = this.state
            payload = {
                url: `Tag/getTagWithEdit/${id}`
            }

            this.TagActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                
                // Mapping data
                this.setState((prevState)=>{
                    let data = _.get(resultData, 'result')
                    let TagData = _.get(data, 'Tag')
                    let result = TagData
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    this.props.detailTagWithEdit(data)
                    return { model: models, isFormValid }
                })
            })
        }
        
        // // For get all case
        if(!this.isEdit) {
            payload = {
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
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            return { model: setFieldValue(name, value, prevState) }
        })
    }

    handleOnDeleteTag(id){
        if(!id) return
        let payload = {
            url: 'Tag/deleteTag',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.TagActions.deleteItem(payload, (err, result)=> {
                if(err) return
                if(!err && result) this.props.deleteTag(id)
            })
        }
    }

    handleOnCreateTag(e, data){
        let { model } = this.state
        let {isFormValid} = this.props
        isFormValid = true
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Tag/createTag',
                body: { 
                    Name: model[TagDefined.NAME].value,
                    Slug: model[TagDefined.SLUG].value
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.TagActions.addItem(payload, (err, result)=> {
                    if(err) return
                    let tagData = Utils.getResApi(result)
                    if(result) this.props.addTag(tagData)
                })
            }
        }
    }

    handleOnUpdateTag(id){
        if(!id) return
        let { model } = this.state
        let payload = {
            url: 'Tag/updateTag',
            body: {
                Name: model.name.value,
                Slug: model.slug.value,
                Id: id
            }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.TagActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result) this.props.updateTag(Utils.getResApi(result))
            })
        }
    }

    render(){
        let { tagData } = this.props
        let { currentRoute, model } = this.state
        let tagList = _.get(tagData, 'tagList')
        let detailData = _.get(tagData, 'detailData')
        let catId = _.get(detailData, 'tag.id')
        return (
            <Fragment>
                <Row>
                    <Col md={5}>
                        <TagForm
                            isEdit={ this.isEdit }
                            currentEditId={catId}
                            model={ model }
                            items={ tagList }
                            detailData={ detailData }
                            onCreateTag={ this.handleOnCreateTag }
                            onInputChange = { this.handleOnInputChange }
                            OnUpdateTag = { this.handleOnUpdateTag }
                        />
                    </Col>
                    <Col md={7}>
                        <TagList
                            isEdit={ this.isEdit }
                            currentEditId={catId}
                            currentRoute={ currentRoute }
                            items={ tagList }
                            onDeleteTag = { this.handleOnDeleteTag }
                        />
                    </Col>
                </Row>
            </Fragment>
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
)(withFormBehaviors(Tag, null))

