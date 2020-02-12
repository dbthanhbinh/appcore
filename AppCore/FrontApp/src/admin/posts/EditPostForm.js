import React, { Component } from 'react'
import _ from 'lodash'
import { Form, Grid } from 'semantic-ui-react'
import AlertCP from '../commons/AlertCP'
import { withFormBehaviors } from '../components/form/form'
import FieldFile from '../components/form/FieldFile'
import PostActions from '../../store/PostActions'
import CategoryActions from '../../store/CategoryActions'
import { PostDefined, SeoDefined } from "../commons/Defined"
import DropdownWrapper from '../components/form/DropdownWrapper'
import SeoForm from '../seos/SeoForm'
import PostModel from '../models/addPost.model'
import TagListModel from '../models/objectTag.model'
import SeoModel from '../models/seo.model'
import eventEmitter from '../../utils/eventEmitter'
import {
    adapterMapingDropdownOption,
    getInputData,
    setFieldValue,
    validatorModel,
    getEditorData,
    pickKeysFromModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

import CKEditor from 'ckeditor4-react'
import BuildTextField from '../components/form/BuildTextField'
import {BtnWithModalEvent} from '../components/form/BtnDefined'

class EditPostForm extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        this.CategoryActions = new CategoryActions()
        let { models, isFormValid } = validatorModel(_.merge(PostModel.model(), SeoModel.model(), TagListModel.model()))
        this.isEditId = null
        this.isEditAble = false
        this.state = {
            isShowModal: false,
            isShowAlert: false,
            isLoading: false,
            isFormValid: isFormValid,
            model: models,
            postTagList: null,
            tagListHidden: null,
            postTagDefaultValues: [],
            postEditData: null,
            postCategoryId: null,
            mediaThumbnal: null,
            isUploadedThumbnail: false,
            isRemovedThumbnail: false
        }
        this.handleOnEditorChange = this.handleOnEditorChange.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnMultipleDropChange = this.handleOnMultipleDropChange.bind(this)
        this.handleRemoveThumbnail = this.handleRemoveThumbnail.bind(this)
    }

    componentDidMount(){
        //eventEmitter.emit('handle-loading-data', { isLoading: true })
        // For Edit case
        let payload = null
        let id = _.get(this.props, 'match.params.id')        
        if(id) {
            // eventEmitter.emit('handle-loading-data', { isLoading: true })

            this.isEditId = id
            this.isEditAble = true
            let { model } = this.state
            payload = {
                url: `Post/getPostWithEdit/${this.isEditId}`
            }
            this.PostActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = result
                // Mapping data
                this.setState((prevState)=>{
                    let keysFromSeoModel = pickKeysFromModel(SeoModel.model())
                    let keysFromPostModel = pickKeysFromModel(PostModel.model())
                    let keysFromObjectTagModel = pickKeysFromModel(TagListModel.model())

                    let postData = _.pick(_.get(resultData, 'post'), keysFromPostModel)
                    let seoData = _.pick(_.get(resultData, 'post.seo'), keysFromSeoModel)
                    let objectTags = _.get(resultData, 'post.objectTags', keysFromObjectTagModel)

                    let result = _.merge(postData, seoData, {tagList: this.getCurrentPostTagList(objectTags)})
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))

                    // eventEmitter.emit('handle-loading-data', { isLoading: false })
                    return { 
                        model: models,
                        isFormValid,
                        postEditData: resultData,
                        postTagList: objectTags,
                        tagListHidden: this.getCurrentPostTagList(objectTags),
                        postTagDefaultValues: this.getCurrentPostTagList(objectTags),
                        mediaThumbnal: _.get(resultData, 'mediaThumbnal')
                    }
                })
            })
        }
    }

    handleRemoveThumbnail(){
        this.setState({
            isRemovedThumbnail: true,
            isUploadedThumbnail: false
        })
    }

    handleOnEditorChange(e, data){        
        let { name, value } = getEditorData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleOnInputChange(e, data){        
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleOnMultipleDropChange(e, data){
        if(data && data.name){
            this.setState((prevState)=>{
                let { models, isFormValid } = setFieldValue(data.name, data.value, prevState)
                return { model: models, isFormValid: isFormValid, postTagDefaultValues: data.value }
            })
        }
    }

    getCurrentPostTagList(postTagList){
        if(_.isEmpty(postTagList)) return []
        let _postTagList = []
        postTagList.forEach(element => {
            _postTagList.push(element.tagId)
        });
        return _postTagList
    }

    handleSubmitUpdateForm(id){
        let {isFormValid} = this.props
        let { model, tagListHidden } = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Post/updatePostBusiness',
                body: {
                    Id: id,
                    Name: model[PostDefined.NAME].value,
                    Content: model[PostDefined.CONTENT].value,
                    CategoryId: model[PostDefined.CATEGORYID].value,
                    TagListHidden: tagListHidden,
                    TagList: model[PostDefined.TAGLIST].value,
                    File: model[PostDefined.FILE].value,
                    SeoTitle: model[SeoDefined.SEOTITLE].value,
                    SeoKeys: model[SeoDefined.SEOKEYS].value,
                    SeoDescription: model[SeoDefined.SEODESCRIPTION].value
                }
            }
            eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.PostActions.updateItemWithForm(payload, (err, result)=> {
                    if(err) return
                    let mediaUpdatedInfo = _.get(result, 'data.mediaUpdated')
                    this.setState((prevState)=>{
                        return { 
                            mediaThumbnal: mediaUpdatedInfo,
                            isUploadedThumbnail: true,
                            isRemovedThumbnail: false
                        }
                    })
                    eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let {
            isShowAlert,
            model,
            postEditData,
            postTagList,
            mediaThumbnal,
            isUploadedThumbnail,
            isRemovedThumbnail
        } = this.state

        let contentValue = _.get(model, `${PostDefined.CONTENT}.value`)
        let categoryList = _.get(postEditData, 'categoryList')
        categoryList = adapterMapingDropdownOption(categoryList)
        let tagList = _.get(postEditData, 'tagList')
        tagList = adapterMapingDropdownOption(tagList)
        let {postTagDefaultValues} = this.state
        let isShowPreview = false
        if(isUploadedThumbnail || !isRemovedThumbnail){
            isShowPreview = true
        }
        return(
            <React.Fragment>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}
                <Grid>
                    <Grid.Row columns={2} className="show-grid">
                        <Grid.Column width={10}>
                            <Form>
                                <Form.Field>
                                    <BuildTextField
                                        name={PostDefined.NAME}
                                        onChange={this.handleOnInputChange}
                                        modelField={model[PostDefined.NAME]}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <CKEditor
                                        onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                        onChange={this.handleOnEditorChange}
                                        data={contentValue || null}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Form>
                                <Form.Field>
                                    <FieldFile mediaThumbnail={mediaThumbnal}
                                        isUploadedThumbnail={isUploadedThumbnail}
                                        onInputChange = {this.handleOnInputChange}
                                        isRemovedThumbnail = {isRemovedThumbnail}
                                        isShowPreview = {isShowPreview}
                                        onHandleRemoveThumbnail = {this.handleRemoveThumbnail}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <DropdownWrapper
                                        search
                                        options={categoryList}
                                        name={PostDefined.CATEGORYID}
                                        onChange={this.handleOnInputChange}
                                        placeholder={'Select category '}
                                        defaultValue={_.get(model, `${PostDefined.CATEGORYID}.value`)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <DropdownWrapper
                                        search
                                        multiple
                                        options={tagList}
                                        name={PostDefined.TAGLIST}
                                        onChange={this.handleOnMultipleDropChange}
                                        placeholder={'Select tags'}
                                        defaultValue={postTagDefaultValues}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input type='hidden'
                                        className='tag-list-hidden'
                                        name='tagListHidden'
                                        defaultValue={this.getCurrentPostTagList(postTagList) || null}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <SeoForm
                                        model={model}
                                        seoData={ _.get(postEditData, 'seo') }
                                        onInputChange = {this.handleOnInputChange} />
                                </Form.Field>
                                <Form.Field>
                                    <BtnWithModalEvent onBtnEvent={()=>this.handleSubmitUpdateForm(this.isEditId)} label={'Update'} />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}
export default withFormBehaviors(EditPostForm, null)