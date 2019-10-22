import React, { Component } from 'react'
import _ from 'lodash'
// import eventEmitter from '../../utils/eventEmitter'
import { Form, Button } from 'react-bootstrap'
import AlertCP from '../commons/AlertCP'
import Model from '../models/ItemApp.model'
import { withFormBehaviors } from '../form/form'
import CustomDropdown from '../form/CustomDropdown'
import { addProducts } from '../../store/ItemActions'
import Utils from '../commons/utils'
import { PostDefined } from "../commons/Defined";
import EditorJs from 'react-editor-js'

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
                    CategoryId: formData[PostDefined.CATEGORYID].value
                }
            }
            // eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isLoading: false }), ()=>{
                    addProducts(payload, (result)=> {
                        this.props.addItem(Utils.getResApi(result))
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowAlert, isLoading } = this.state
        return(
            <Form>
                { isShowAlert && <AlertCP content={`Success`} variant='success' />}
                <Form.Group>
                    <Form.Control type='text' name='name' onChange={this.handleOnInputChange} placeholder='Enter name...'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" rows="3" name='content' onChange={this.handleOnInputChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <CustomDropdown onInputChange = {this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='file' name='file' id='file'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="button" disabled={!!isLoading} onClick={this.handleSubmitForm}>Submit</Button>
                </Form.Group>
                
            </Form>
        )
    }
}
const ItemForm = withFormBehaviors(itemForm, Model)
export default ItemForm