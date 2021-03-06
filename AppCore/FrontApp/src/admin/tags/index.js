import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Tag'

import {  Grid } from 'semantic-ui-react'
import TagList from './ItemList'
import TagForm from './TagForm'
import Utils from '../../apis/utils'
import { getInputData, setFieldValue, mappingModelDefaultData, validatorModel, resetModelDefaultData, pickKeysFromModel }
from '../../utils/FormUtils'
import TagModel from '../models/addTag.model'
import { TagDefined } from '../commons/Defined'
import { withFormBehaviors } from '../components/form/form'
import TagActions from '../../store/TagActions'

class Tag extends Component{
    constructor(props){
        super(props)
        this.TagActions = new TagActions()
        let { models, isFormValid } = validatorModel(TagModel.model())
        this.state = {
            currentRoute: 'tags',
            isFormValid: isFormValid,
            model: models
        }
        this.isEdit = false
        this.handleOnCreateTag = this.handleOnCreateTag.bind(this)
        this.handleOnDeleteTag = this.handleOnDeleteTag.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnUpdateTag = this.handleOnUpdateTag.bind(this)
    }

    

    componentDidMount(){
        // For Edit case
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
                    let keysFromTagModel = pickKeysFromModel(TagModel.model())
                    let categoryData = _.pick(_.get(data, 'tag'), keysFromTagModel)
                    let result = categoryData
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    this.props.detailTagWithEdit(data)
                    return { model: models, isFormValid }
                })
            })
        }
        
        // For get all case
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
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
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
                    
                    this.setState((prevState)=>{
                        let { models, isFormValid } = validatorModel(resetModelDefaultData(TagModel.model()))
                        return { model: models, isFormValid }
                    })
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
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={6}>
                            <TagForm
                                isEdit={ this.isEdit }
                                currentEditId={catId}
                                model={ model }
                                items={ tagList }
                                detailData={ detailData }
                                onInputChange = { this.handleOnInputChange }
                                onCreateTag={ this.handleOnCreateTag }                                
                                onUpdateTag = { this.handleOnUpdateTag }
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <TagList
                                isEdit={ this.isEdit }
                                currentEditId={catId}
                                currentRoute={ currentRoute }
                                items={ tagList }
                                onDeleteTag = { this.handleOnDeleteTag }
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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

