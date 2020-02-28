import React from 'react'
import SeoForm from '../seos/SeoForm'
import SeoModel from '../models/seo.model'
import { Form } from 'semantic-ui-react'
import {BtnWithModalEvent} from '../components/form/BtnDefined'
import {withFormBehaviors} from '../components/form/form'
import { SeoDefined } from "../commons/Defined"
import _ from 'lodash'
import {
    validatorModel
} from '../../utils/FormUtils'
import BaseSetting from './BaseSetting'

class SeoSetting extends BaseSetting {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(SeoModel.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.settingName = 'GeneralSeoSetting'
        this.AutoLoad = 'Yes'
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let seoFormData = {
            seoTitle: model[SeoDefined.SEOTITLE].value,
            seoKeys: model[SeoDefined.SEOKEYS].value,
            seoDescription: model[SeoDefined.SEODESCRIPTION].value
        }
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Setting/updateGeneralSeting',
                body: {
                    settingName: this.settingName,
                    autoLoad: this.AutoLoad,
                    Value: JSON.stringify(seoFormData),
                    CustomValue: null
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.handleSubmitFormSupper(payload)
            }
        }
    }

    render(){
        let {model, generalSeoSetting} = this.state
        return(
            <Form>
                <Form.Field>
                    <SeoForm
                        model={model}
                        seoData={generalSeoSetting}  
                        onInputChange={this.handleOnInputChange}
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