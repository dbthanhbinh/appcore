import React, { Component } from 'react'
import _ from 'lodash'
// import eventEmitter from '../../utils/eventEmitter'
import { Form, Button } from 'react-bootstrap'
import AlertCP from '../commons/AlertCP'
import Model from '../models/ItemApp.model'
import { withFormBehaviors } from '../form/form'
import CustomDropdown from '../form/CustomDropdown'
import CustomFile from '../form/CustomFile'
import { addItem } from '../../store/ItemActions'
import Utils from '../commons/utils'
import { PostDefined } from "../commons/Defined";
import TagsOptions from '../tags'
import SeoForm from '../../components/SeoForm'
import ReactSelect from '../form/ReactSelect'

class itemForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowAlert: false,
            isLoading: false
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
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
                this.setState(()=>({ isLoading: false }), ()=>{
                    addItem(payload, (result)=> {
                        this.props.addItem(Utils.getResListApi(result))
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowAlert } = this.state
        let { isFormValid, formData } = this.props
        let post_name = _.get(formData, `${PostDefined.NAME}.label`)
        let post_content = _.get(formData, `${PostDefined.CONTENT}.label`)
        let post_categoryid = _.get(formData, `${PostDefined.CATEGORYID}.label`)
        return(
            <React.Fragment>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}
                <Form.Group>
                    <Form.Control type='text' name={PostDefined.NAME} onChange={this.handleOnInputChange} defaultValue='' placeholder={ post_name } />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" rows="3" name={PostDefined.CONTENT} defaultValue='' placeholder={ post_content } onChange={this.handleOnInputChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <CustomDropdown defaultValue='' name={PostDefined.CATEGORYID} placeholder={ post_categoryid } onInputChange = {this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <CustomFile defaultValue='' onInputChange = {this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <SeoForm onInputChange = {this.handleOnInputChange} formData={ formData } />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" disabled={isFormValid} type="button" onClick={this.handleSubmitForm}>Submit</Button>
                </Form.Group>
                <Form.Group>
                    <TagsOptions />
                </Form.Group>
            </React.Fragment>
        )
    }
}
const ItemForm = withFormBehaviors(itemForm, Model)
export default ItemForm