import React, { Component, Fragment } from 'react'
import { Form, Button, Grid } from 'semantic-ui-react'
import { Redirect } from "react-router-dom"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/User'

import { withFormBehaviors } from '../components/form/form'
import { Defined } from './Defined'
import { loginUser } from '../../store/UserActions'
import Model from './Login.model'
import _ from 'lodash'
import { withCookies } from 'react-cookie'

class login extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirectToReferrer: false,
            afterLogin: '/home'  // home page
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleOnInputChange(e, data){
        this.props.onInputChange(e, data)
    }

    handleSubmitForm(e, data){
        let {isFormValid, formData, cookies } = this.props
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'User/authenticate',
                body: {
                    Phone: '0909874825', //formData[Defined.PHONE].value,
                    Password: formData[Defined.PASSWORD].value
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                loginUser(payload, (err, result)=> { // For add user
                    if(err) return
                    if(result){
                        cookies.set('MAP_cookies', result, { path: '/' })
                        this.setState({ isLoading: false, redirectToReferrer: true })
                    }
                })
            }
        }
    }

    render(){
        let { formData } = this.props
        let { redirectToReferrer, afterLogin } = this.state
        let phone = _.get(formData, `${ Defined.PHONE }.label`)
        let password = _.get(formData, `${ Defined.PASSWORD }.label`)
        return redirectToReferrer
        ? <Redirect to={afterLogin}/>
        : <Fragment>
            <Grid textAlign='center' verticalAlign='middle' columns={1}>
                <Grid.Column width={5}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Field>
                                <input name={ Defined.PHONE } placeholder={ phone } onChange={this.handleOnInputChange} />
                            </Form.Field>
                        <Form.Field>
                            <input type='password' name={ Defined.PASSWORD } placeholder={ password } onChange={this.handleOnInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <Button variant="primary" type="button" onClick={this.handleSubmitForm} > Đăng Nhập </Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>  
        </Fragment>
    }
}
const Login = withFormBehaviors(login, Model)

function mapStateToProps(state) {
    let { userData } = state.userData
    return { userData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withCookies(Login))
