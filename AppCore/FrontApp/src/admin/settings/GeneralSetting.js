import React, {Component} from 'react'
import BuildTextField from '../components/form/BuildTextField'
import Model from '../models/generalSetting.model'
import { Form } from 'semantic-ui-react'
import {BtnWithModalEvent} from '../components/form/BtnDefined'
import { withFormBehaviors } from '../components/form/form'
import { GeneralSettingDefined } from "../commons/Defined"
import _ from 'lodash'
import {
    validatorModel
} from '../../utils/FormUtils'

import BaseSetting from './BaseSetting'

class SeoSetting extends BaseSetting {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(Model.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.settingName = 'GeneralSetting'
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let formData = {
            googleAnalyticCode: model[GeneralSettingDefined.GOOGLEANALYTICCODE].value,
            copyrightText: model[GeneralSettingDefined.COPYRIGHTTEXT].value
        }
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Setting/updateGeneralSeting',
                body: {
                    settingName: this.settingName,
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
            <Form>
                <Form.Field>
                    <BuildTextField
                        name={GeneralSettingDefined.GOOGLEANALYTICCODE}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[GeneralSettingDefined.GOOGLEANALYTICCODE] : null}
                    />
                </Form.Field>
                <Form.Field>
                    <BuildTextField
                        name={GeneralSettingDefined.COPYRIGHTTEXT}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[GeneralSettingDefined.COPYRIGHTTEXT] : null}
                    />
                </Form.Field>
                <Form.Field>
                    <BtnWithModalEvent onBtnEvent={this.handleSubmitForm} label={'Update'} />
                </Form.Field>
            </Form>
        )
    }
}

export default withFormBehaviors(SeoSetting, null)