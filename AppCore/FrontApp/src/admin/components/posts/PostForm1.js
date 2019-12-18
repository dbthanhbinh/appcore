import React, { Component } from 'react'
import _ from 'lodash'
import { Form, Button, Modal, Container,  Grid, ModalHeader, ModalContent } from 'semantic-ui-react'
import AlertCP from '../commons/AlertCP'
import { withFormBehaviors } from '../form/form'
import FieldFile from '../form/FieldFile'
import PostActions from '../../../store/PostActions'
import CategoryActions from '../../../store/CategoryActions'
import Utils from '../../../apis/utils'
import { PostDefined, SeoDefined } from "../commons/Defined"
import TagOptions from '../tags/TagOptions'
import CategoryOptions from '../categories/CategoryOptions'
import DropdownWrapper from '../form/DropdownWrapper'
import SeoForm from '../seos/SeoForm'
import PostModel from '../models/addPost.model'
import SeoModel from '../models/seo.model'
import {
    getInputData,
    setFieldValue,
    validatorModel,
    getEditorData,
    pickKeysFromModel,
    mappingModelDefaultData
} from '../../../utils/FormUtils'

import CKEditor from 'ckeditor4-react'
import BuildTextField from '../form/BuildTextField'
import {BtnWithModalEvent} from '../form/BtnDefined'

class postForm extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        this.CategoryActions = new CategoryActions()
        let { models, isFormValid } = validatorModel(_.merge(PostModel.model(), SeoModel.model()))
        this.isEditId = null
        this.state = {
            isShowModal: false,
            isShowAlert: false,
            isLoading: false,
            isFormValid: isFormValid,
            model: models,
            postEditData: null
        }
        this.handleOnEditorChange = this.handleOnEditorChange.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    componentDidMount(){
        // For Edit case
        let payload = null
        let id = _.get(this.props, 'match.params.id')        
        if(id) {
            this.isEditId = id
            let { model } = this.state
            payload = {
                url: `Post/getPostWithEdit/${this.isEditId}`
            }
            this.PostActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                
                // Mapping data
                this.setState((prevState)=>{
                    let keysFromSeoModel = pickKeysFromModel(SeoModel.model())
                    let keysFromPostModel = pickKeysFromModel(PostModel.model())
                    let postData = _.pick(_.get(resultData, 'post'), keysFromPostModel)
                    let seoData = _.pick(_.get(resultData, 'seo'), keysFromSeoModel)
                    let result = _.merge(postData, seoData)
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    return { model: models, isFormValid, postEditData: resultData }
                })
            })
        }
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

    handleSubmitForm(e, data){
        let {isFormValid} = this.props
        let { model } = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Post/updatePost',
                body: {
                    Name: model[PostDefined.NAME].value,
                    Content: model[PostDefined.CONTENT].value,
                    CategoryId: model[PostDefined.CATEGORYID].value,
                    TagList: model[PostDefined.TAGLIST].value,
                    File: model[PostDefined.FILE].value,
                    SeoTitle: model[SeoDefined.SEOTITLE].value,
                    SeoKeys: model[SeoDefined.SEOKEYS].value,
                    SeoDescription: model[SeoDefined.SEODESCRIPTION].value
                }
            }
            // eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isLoading: false, isShowModal: false }), ()=>{
                    this.PostActions.addItemWithForm(payload, (err, result)=> {
                        if(err) return
                        let postData = Utils.getResListApi(result)
                        if(result) this.props.addItem(postData)
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowAlert, model, postEditData } = this.state
        let contentValue = _.get(model, `${PostDefined.CONTENT}.value`)
        console.log('=====', _.get(postEditData, 'tagList'))
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
                                    <DropdownWrapper
                                        isEditId={this.isEditId}
                                        options={_.get(postEditData, 'categoryList')}
                                        name={PostDefined.CATEGORYID}
                                        onChange={this.handleOnInputChange}
                                        placeholder={'Select group menu '}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <FieldFile defaultValue='' onInputChange = {this.handleOnInputChange} />
                                </Form.Field>
                                <Form.Field>
                                    <DropdownWrapper
                                        isEditId={this.isEditId}
                                        options={_.get(postEditData, 'tagList')}
                                        name={PostDefined.TAGLIST}
                                        setMultiple={true}
                                        onChange={this.handleOnInputChange}
                                        placeholder={'Select group menu '}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <SeoForm
                                        model={model}
                                        seoData={ _.get(postEditData, 'seo') }
                                        onInputChange = {this.handleOnInputChange} />
                                </Form.Field>
                                <Form.Field>
                                    <BtnWithModalEvent onBtnEvent={this.handleSubmitForm} label={'Add new'} />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}
const PostForm = withFormBehaviors(postForm, null)
export default PostForm