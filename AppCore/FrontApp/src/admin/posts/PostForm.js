import React, { Component } from 'react'
import _ from 'lodash'
import { Form, Modal, Container,  Grid, ModalHeader, ModalContent } from 'semantic-ui-react'
import AlertCP from '../commons/AlertCP'
import {withFormBehaviors} from '../components/form/form'
import FieldFile from '../components/form/FieldFile'
import PostActions from '../../store/PostActions'
import Utils from '../../apis/utils'
import { PostDefined, SeoDefined } from "../commons/Defined"
import DropdownWrapper from '../components/form/DropdownWrapper'
import SeoForm from '../seos/SeoForm'
import PostModel from '../models/addPost.model'
import SeoModel from '../models/seo.model'
import {
    adapterMapingDropdownOption,
    getInputData,
    getEditorData,
    setFieldValue,
    validatorModel
} from '../../utils/FormUtils'
import CKEditor from 'ckeditor4-react'
import BuildTextField from '../components/form/BuildTextField'
import {BtnWithModalEvent} from '../components/form/BtnDefined'

class postForm extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        let { models, isFormValid } = validatorModel(_.merge(PostModel.model(), SeoModel.model()))
        this.state = {
            isShowModal: false,
            isShowAlert: false,
            isLoading: false,
            isFormValid: isFormValid,
            model: models,
            postTagDefaultValues: []
        }
        this.handleOnEditorChange = this.handleOnEditorChange.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOnMultipleDropChange = this.handleOnMultipleDropChange.bind(this)
    }

    handleOpenModal(){
        this.setState({isShowModal: true})
    }

    handleCloseModal(){
        this.setState({isShowModal: false})
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
        this.PostActions = new PostActions()
        let {isFormValid} = this.props
        let { model } = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Post/createPost',
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
                this.PostActions.addItemWithForm(payload, (err, result)=> {
                    if(err) return
                    if(result) {
                        let postData = _.get(Utils.getResApi(result), 'postData')
                        this.props.addPost(postData)
                        this.handleCloseModal()
                        // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                    }
                })
            }
        }
    }

    handleOnMultipleDropChange(e, data){
        if(data && data.name){
            this.setState((prevState)=>{
                let { models, isFormValid } = setFieldValue(data.name, data.value, prevState)
                return { model: models, isFormValid: isFormValid, postTagDefaultValues: data.value }
            })
        }
    }

    render(){
        let { isShowAlert, isShowModal, model } = this.state
        let {
            categoryData,
            tagData,
            detailData           
        } = this.props

        let contentValue = _.get(model, `${PostDefined.CONTENT}.value`)
        let categoryList = adapterMapingDropdownOption(_.get(categoryData, 'categoryList'))
        let tagList = adapterMapingDropdownOption(_.get(tagData, 'tagList'))
        let {postTagDefaultValues} = this.state

        return(
            <React.Fragment>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}
                <BtnWithModalEvent onBtnEvent={this.handleOpenModal} customClass={'primary'} />
                <Modal
                    open={isShowModal}
                    >
                    <ModalHeader>
                        <h4>Add new</h4>
                    </ModalHeader>
                    <ModalContent>
                        <Container>
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
                                                <FieldFile defaultValue='' onInputChange = {this.handleOnInputChange} />
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
                                                <SeoForm
                                                    model={model}
                                                    seoData={ _.get(detailData, 'seo') }
                                                    onInputChange = {this.handleOnInputChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <BtnWithModalEvent onBtnEvent={this.handleSubmitForm} label={'Add new'} />
                                                <BtnWithModalEvent onBtnEvent={this.handleCloseModal} label={'Close'} />
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </ModalContent>
                </Modal>
            </React.Fragment>
        )
    }
}
const PostForm = withFormBehaviors(postForm, null)
export default PostForm