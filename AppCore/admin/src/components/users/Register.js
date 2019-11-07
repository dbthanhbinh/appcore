import React, { Component, Fragment } from 'react'
import { Form, Button } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/User'

import { withFormBehaviors } from '../form/form'
import Utils from '../commons/utils'
import { Defined } from './Defined'
import { addUser } from '../../store/UserActions'
import Model from './Register.model'
import _ from 'lodash'

class register extends Component{
    constructor(props){
        super(props)
        this.state = {}
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
                url: 'User/createUser',
                body: {
                    FullName: formData[Defined.FULLNAME].value,
                    Phone: formData[Defined.EMAil].value,
                    Email: formData[Defined.PHONE].value,
                    Password: formData[Defined.PASSWORD].value,
                    RePassword: formData[Defined.REPASSWORD].value
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isLoading: false }), ()=>{
                    addUser(payload, (result)=> { // For add user
                        this.props.addItem(Utils.getResListApi(result))  // For add item to state
                    })
                })
            }
        }
    }

    render(){
        let { formData } = this.props
        let full_name = _.get(formData, `${ Defined.FULLNAME }.label`)
        let phone = _.get(formData, `${ Defined.PHONE }.label`)
        let email = _.get(formData, `${ Defined.EMAil }.label`)
        let password = _.get(formData, `${ Defined.PASSWORD }.label`)
        let rePassword = _.get(formData, `${ Defined.REPASSWORD }.label`)

        return(
            <Fragment>
                <h1>Register</h1>
                <Form.Group>
                    <Form.Control type='text' name={ Defined.FULLNAME } placeholder={ full_name } onChange={this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' name={ Defined.PHONE } placeholder={ phone } onChange={this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='email' name={ Defined.EMAil } placeholder={ email } onChange={this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' name={ Defined.PASSWORD } placeholder={ password } onChange={this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' name={ Defined.REPASSWORD } placeholder={ rePassword } onChange={this.handleOnInputChange} />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="button" onClick={this.handleSubmitForm} > Đăng ký </Button>
                </Form.Group>
            </Fragment>
        )
    }
}
const Register = withFormBehaviors(register, Model)

function mapStateToProps(state) {
    let { users } = state.users
    return { users }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Register)
