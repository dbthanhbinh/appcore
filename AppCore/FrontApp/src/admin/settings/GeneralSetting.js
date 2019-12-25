import React, {Component} from 'react'
import eventEmitter from '../../utils/eventEmitter'
import BuildTextField from '../components/form/BuildTextField'
import Model from '../models/generalSetting.model'
import { Form } from 'semantic-ui-react'
import {BtnWithModalEvent} from '../components/form/BtnDefined'
import { withFormBehaviors } from '../components/form/form'
import { GeneralSettingDefined } from "../commons/Defined"
import _ from 'lodash'
import Utils from '../../apis/utils'
import SettingActions from '../../store/SettingActions'
import {
    getInputData,
    setFieldValue,
    validatorModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

class SeoSetting extends Component {
    constructor(props){
        super(props)
        this.SettingActions = new SettingActions()
        let { models, isFormValid } = validatorModel(Model.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    componentDidMount(){
        let {model} = this.state
        let payload = {
            url: `Setting/getGeneralSetting/GeneralSetting`
        }
        eventEmitter.emit('handle-submit-form-data', { isLoading: true })
        this.SettingActions.detailItem(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            let generalSeoSetting = null
            if(resultData && resultData.value) {
                generalSeoSetting = JSON.parse(resultData.value)
            }
            let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, generalSeoSetting))
            this.setState(()=>{
                return { model: models, isFormValid }
            })
            eventEmitter.emit('handle-submit-form-data', { isLoading: false })
        })
    }

    handleOnInputChange(e, data){        
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let formData = {
            seoTitle: model[GeneralSettingDefined.GOOGLEANALYTICCODE].value,
            seoKeys: model[GeneralSettingDefined.COPYRIGHTTEXT].value
        }
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Setting/updateGeneralSeting',
                body: {
                    Value: JSON.stringify(formData),
                    CustomValue: null
                }
            }
            eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({}), ()=>{
                    this.SettingActions.updateItem(payload, (err, result)=> {
                        if(err) return

                        let generalSeoSetting = null
                        if(result && result.data && result.data.value) {
                            generalSeoSetting = JSON.parse(result.data.value)
                        }
                        let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, generalSeoSetting))
                        this.setState(()=>{
                            return { model: models, isFormValid }
                        })
                        eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                    })
                })
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
                    <BtnWithModalEvent onBtnEvent={this.handleSubmitForm} label={'Update'} />
                </Form.Field>
            </Form>
        )
    }
}

export default withFormBehaviors(SeoSetting, null)