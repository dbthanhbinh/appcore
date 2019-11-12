import React, { Component } from 'react'
import _ from 'lodash'
// import eventEmitter from '../../utils/eventEmitter'
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap'
import AlertCP from '../commons/AlertCP'
import { withFormBehaviors } from '../form/form'
import CustomDropdown from '../form/CustomDropdown'
import CustomFile from '../form/CustomFile'
import PostActions from '../../store/PostActions'
import Utils from '../commons/utils'
import { PostDefined } from "../commons/Defined";
import TagsOptions from '../tags'
import SeoForm from '../seos/SeoForm'
import PostModel from '../models/addPost.model'
import SeoModel from '../models/seo.model'
import 'bootstrap/dist/css/bootstrap.min.css'

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
        this.props.onInputChange(e, data)
    }

    handleSubmitForm(e, data){
        let {isFormValid, formData} = this.props
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Post/createPost',
                body: {
                    Name: formData[PostDefined.NAME].value,
                    Content: formData[PostDefined.CONTENT].value,
                    CategoryId: formData[PostDefined.CATEGORYID].value,
                    File: formData[PostDefined.FILE].value,
                    SeoTitle: formData[PostDefined.SEOTITLE].value,
                    SeoKeys: formData[PostDefined.SEOKEYS].value,
                    SeoDescription: formData[PostDefined.SEODESCRIPTION].value,
                }
            }
            // eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isLoading: false, isShowModal: false }), ()=>{
                    this.PostActions.addItem(payload, (err, result)=> {
                        if(err) return
                        if(result) this.props.addItem(Utils.getResListApi(result))
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowAlert, isShowModal, model } = this.state
        let post_name = _.get(model, `${PostDefined.NAME}.label`)
        let post_content = _.get(model, `${PostDefined.CONTENT}.label`)
        let post_categoryid = _.get(model, `${PostDefined.CATEGORYID}.label`)
        return(
            <React.Fragment>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}

                <Button onClick={this.handleOpenModal} variant="primary">Add new</Button>
                <Modal
                    show={isShowModal}
                    size="xs"
                    >
                    <Modal.Header>
                        <Modal.Title>Add new</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="show-grid">
                                <Col xs={12} md={8}>
                                    <Form.Group>
                                        <Form.Control type='text' name={PostDefined.NAME} onChange={this.handleOnInputChange} defaultValue='' placeholder={ post_name } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control as="textarea" rows="3" name={PostDefined.CONTENT} defaultValue='' placeholder={ post_content } onChange={this.handleOnInputChange}></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group>
                                        <CustomDropdown defaultValue='' name={PostDefined.CATEGORYID} placeholder={ post_categoryid } onInputChange = {this.handleOnInputChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <CustomFile defaultValue='' onInputChange = {this.handleOnInputChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <TagsOptions />
                                    </Form.Group>
                                    <Form.Group>
                                        <SeoForm onInputChange = {this.handleOnInputChange} model={ model } />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="button" onClick={this.handleSubmitForm}>Submit</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}
const PostForm = withFormBehaviors(postForm, null)
export default PostForm