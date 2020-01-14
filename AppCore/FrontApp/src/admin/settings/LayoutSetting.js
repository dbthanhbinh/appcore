import React from 'react'
import _ from 'lodash'

import BuildTextField from '../components/form/BuildTextField'
import Model from '../models/layoutSetting.model'
import { LayoutDefined } from "../commons/Defined"
import DropdownWrapper from '../components/form/DropdownWrapper'

import { Form } from 'semantic-ui-react'
import {BtnWithModalEvent} from '../components/form/BtnDefined'
import { withFormBehaviors } from '../components/form/form'
import BaseSetting from './BaseSetting'
import {
    getInputData,
    setFieldValue,
    validatorModel
} from '../../utils/FormUtils'

const layoutOptions = [
    { key: 1, text: 'Full width', value: 'full' },
    { key: 2, text: 'Left sidebar', value: 'left-sidebar' },
    { key: 3, text: 'Right sidebar', value: 'right-sidebar' },
    { key: 4, text: 'Left content Right', value: 'left-content-right' }
]

class LayoutSetting extends BaseSetting {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(Model.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.defaultLayout = 'full'
        this.settingName = 'LayoutSetting'
        this.AutoLoad = 'Yes'
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let formData = {
            pageLayout: (model[LayoutDefined.PAGE_LAYOUT].value !== '') ? model[LayoutDefined.PAGE_LAYOUT].value : this.defaultLayout,
            postLayout: (model[LayoutDefined.POST_LAYOUT].value !== '') ? model[LayoutDefined.POST_LAYOUT].value : this.defaultLayout,
            archiveLayout: (model[LayoutDefined.ARCHIVE_LAYOUT].value) ? model[LayoutDefined.ARCHIVE_LAYOUT].value : this.defaultLayout,
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

    handleOnInputChange(e, data){        
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    render(){
        let {model} = this.state
        return(
            <Form>
                <Form.Field>
                    <DropdownWrapper
                        options={layoutOptions}
                        name={LayoutDefined.PAGE_LAYOUT}
                        onChange={this.handleOnInputChange}
                        placeholder={'Select page layout '}
                        defaultValue={_.get(model, `${LayoutDefined.PAGE_LAYOUT}.value`)}
                    />
                </Form.Field>
                <Form.Field>
                    <DropdownWrapper
                        options={layoutOptions}
                        name={LayoutDefined.POST_LAYOUT}
                        onChange={this.handleOnInputChange}
                        placeholder={'Select post layout '}
                        defaultValue={_.get(model, `${LayoutDefined.POST_LAYOUT}.value`)}
                    />
                </Form.Field>
                <Form.Field>
                    <DropdownWrapper
                        options={layoutOptions}
                        name={LayoutDefined.ARCHIVE_LAYOUT}
                        onChange={this.handleOnInputChange}
                        placeholder={'Select archive layout '}
                        defaultValue={_.get(model, `${LayoutDefined.ARCHIVE_LAYOUT}.value`)}
                    />
                </Form.Field>

                <Form.Field>
                    <BtnWithModalEvent onBtnEvent={this.handleSubmitForm} label={'Update'} />
                </Form.Field>
            </Form>
        )
    }
}

export default withFormBehaviors(LayoutSetting, null)