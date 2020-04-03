import React from 'react'
import {
    BuildTextField,
    BuildButtonField
} from '../components/form/BuildFormField'

import Model from '../models/contactSetting.model'
import { ContactDefined } from "../commons/Defined"

import {withFormBehaviors} from '../components/form/form'
import _ from 'lodash'
import {
    validatorModel
} from '../../utils/FormUtils'

import BaseSetting from './BaseSetting'

class ContactSetting extends BaseSetting {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(Model.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.settingName = 'ContactSetting'
        this.AutoLoad = 'Yes'
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let formData = {
            companyName: model[ContactDefined.COMPANY_NAME].value,
            companyAddress: model[ContactDefined.COMPANY_ADDRESS].value,
            companyHotline: model[ContactDefined.COMPANY_HOTLINE].value,
            companyPhone: model[ContactDefined.COMPANY_PHONE].value,
            companyEmail: model[ContactDefined.COMPANY_EMAIL].value,
            zaloMessage: model[ContactDefined.ZALO_MESSAGE].value,
            phoneMessage: model[ContactDefined.PHONE_MESSAGE].value,
            facebookMessage: model[ContactDefined.FACEBOOK_MESSAGE].value
        }
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Setting/updateGeneralSeting',
                body: {
                    settingName: this.settingName,
                    autoLoad: this.AutoLoad,
                    Value: JSON.stringify(formData),
                    CustomValue: null
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.handleSubmitFormSupper(payload)
            }
        }
    }

    render(){
        let {model} = this.state
        return(
            <React.Fragment>
                <BuildTextField
                    name={ContactDefined.COMPANY_NAME}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.COMPANY_NAME] : null}
                />
                <BuildTextField
                    name={ContactDefined.COMPANY_ADDRESS}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.COMPANY_ADDRESS] : null}
                />
                <BuildTextField
                    name={ContactDefined.COMPANY_HOTLINE}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.COMPANY_HOTLINE] : null}
                />
                <BuildTextField
                    name={ContactDefined.COMPANY_PHONE}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.COMPANY_PHONE] : null}
                />
                <BuildTextField
                    type='email'
                    name={ContactDefined.COMPANY_EMAIL}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.COMPANY_EMAIL] : null}
                />
                <BuildTextField
                    name={ContactDefined.ZALO_MESSAGE}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.ZALO_MESSAGE] : null}
                />
                <BuildTextField
                    name={ContactDefined.PHONE_MESSAGE}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.PHONE_MESSAGE] : null}
                />
                <BuildTextField
                    name={ContactDefined.FACEBOOK_MESSAGE}
                    onChange={this.handleOnInputChange}
                    modelField={model ? model[ContactDefined.FACEBOOK_MESSAGE] : null}
                />
                <BuildButtonField
                    label={`Save change`}
                    className='btn-success float-right'
                    onClick={this.handleSubmitForm}
                />
            </React.Fragment>
        )
    }
}

export default withFormBehaviors(ContactSetting, null)