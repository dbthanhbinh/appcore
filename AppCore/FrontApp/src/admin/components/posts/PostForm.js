import React, { Component } from 'react'
import _ from 'lodash'
// import eventEmitter from '../../../utils/eventEmitter'
import { Form, Button, Modal, Container,  Grid, ModalHeader, ModalContent } from 'semantic-ui-react'
import AlertCP from '../commons/AlertCP'
import { withFormBehaviors } from '../form/form'
import CustomDropdown from '../form/CustomDropdown'
import CustomFile from '../form/CustomFile'
import PostActions from '../../../store/PostActions'
import Utils from '../../../apis/utils'
import { PostDefined, SeoDefined } from "../commons/Defined"
import TagsOptions from '../tags'
import SeoForm from '../seos/SeoForm'
import PostModel from '../models/addPost.model'
import SeoModel from '../models/seo.model'
import { getInputData, getEditorData, setFieldValue } from '../../../utils/FormUtils'
import CKEditor from 'ckeditor4-react'

class postForm extends Component {
    constructor(props){
        super(props)
        this.PostActions = new PostActions()
        const Model = _.merge(PostModel.model(), SeoModel.model())
        this.state = {
            isShowModal: false,
            isShowAlert: false,
            isLoading: false,
            model: Model
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleOpenModal(){
        this.setState({isShowModal: true})
    }

    handleCloseModal(){
        this.setState({isShowModal: false})
    }

    handleOnInputChange(e, data){
        let { name, value } = getEditorData(e)
        this.setState((prevState)=>{
            return { model: setFieldValue(name, value, prevState) }
        })
    }

    handleSubmitForm(e, data){
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
                    File: model[PostDefined.FILE].value,
                    SeoTitle: model[SeoDefined.SEOTITLE].value,
                    SeoKeys: model[SeoDefined.SEOKEYS].value,
                    SeoDescription: model[SeoDefined.SEODESCRIPTION].value,
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
        let { isShowAlert, isShowModal, model } = this.state
        let nameLabel = _.get(model, `${PostDefined.NAME}.label`)
        let contentLabel = _.get(model, `${PostDefined.CONTENT}.label`)
        let categoryidLabel = _.get(model, `${PostDefined.CATEGORYID}.label`)

        let nameValue = _.get(model, `${PostDefined.NAME}.value`)
        let contentValue = _.get(model, `${PostDefined.CONTENT}.value`)
        let categoryidValue = _.get(model, `${PostDefined.CATEGORYID}.value`)
        return(
            <React.Fragment>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}

                <Button onClick={this.handleOpenModal} variant="primary">Add new</Button>
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
                                                <input type='text' name={PostDefined.NAME} onChange={this.handleOnInputChange} defaultValue={nameValue||null} placeholder={ nameLabel } />
                                            </Form.Field>
                                            <Form.Field>
                                                <CKEditor
                                                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
                                                    onChange={this.handleOnInputChange}
                                                    data={contentValue || null}
                                                />
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Form>
                                            <Form.Field>
                                                <CustomDropdown defaultValue={categoryidValue || null} name={PostDefined.CATEGORYID} placeholder={ categoryidLabel } onInputChange = {this.handleOnInputChange} />
                                            </Form.Field>
                                            <Form.Field>
                                                <CustomFile defaultValue='' onInputChange = {this.handleOnInputChange} />
                                            </Form.Field>
                                            <Form.Field>
                                                {/* <TagsOptions /> */}
                                            </Form.Field>

                                            <SeoForm onInputChange = {this.handleOnInputChange} model={ model } />
                                            
                                            <Form.Field>
                                                <Button variant="primary" type="button" onClick={this.handleSubmitForm}>Submit</Button>
                                                <Button variant="secondary" onClick={this.handleCloseModal}> Close</Button>
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