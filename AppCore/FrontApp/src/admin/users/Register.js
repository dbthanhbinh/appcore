import React from 'react'
import { Form } from 'semantic-ui-react'
import { withFormBehaviors } from '../components/form/form'
import Utils from '../../apis/utils'
import { Defined } from './Defined'
import { addUser } from '../../store/UserActions'
import Model from './Register.model'
import _ from 'lodash'
import {
    getInputData,
    setFieldValue,
    validatorModel
} from '../../utils/FormUtils'
import BuildTextField from '../components/form/BuildTextField'
import {BtnWithModalEvent} from '../components/form/BtnDefined'

class Register extends React.Component{
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(_.merge(Model.model()))
        this.state = {
            isBtnLoading: false,
            currentRoute: 'member',
            isFormValid: isFormValid,
            model: models
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleSubmitForm(e, data){
        let {isFormValid, model} = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'User/registerMember',
                body: {
                    FullName: model[Defined.FULLNAME].value,
                    Phone: model[Defined.PHONE].value,
                    Email: model[Defined.EMAIl].value,
                    Password: model[Defined.PASSWORD].value,
                    RePassword: model[Defined.REPASSWORD].value
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isLoading: false }), ()=>{
                    addUser(payload, (result)=> { // For add user
                        //this.props.addItem(Utils.getResListApi(result))  // For add item to state
                    })
                })
            }
        }
    }

    render(){
        let { model, isFormValid } = this.state

        return(
            <Form>
                <h1>Register</h1>
                <Form.Field>
                    <BuildTextField
                        name={Defined.FULLNAME}
                        onChange={this.handleOnInputChange}
                        modelField={model[Defined.FULLNAME]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        name={Defined.PHONE}
                        onChange={this.handleOnInputChange}
                        modelField={model[Defined.PHONE]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        name={Defined.EMAIl}
                        onChange={this.handleOnInputChange}
                        modelField={model[Defined.EMAIl]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        type='password'
                        name={Defined.PASSWORD}
                        onChange={this.handleOnInputChange}
                        modelField={model[Defined.PASSWORD]}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        type='password'
                        name={Defined.REPASSWORD}
                        onChange={this.handleOnInputChange}
                        modelField={model[Defined.REPASSWORD]}
                    />
                </Form.Field>
                <Form.Field>
                    <BtnWithModalEvent 
                        disabled={!isFormValid}
                        onBtnEvent={this.handleSubmitForm} label={'Đăng ký'}
                    />
                </Form.Field>
            </Form>
        )
    }
}
export default withFormBehaviors(Register, null)