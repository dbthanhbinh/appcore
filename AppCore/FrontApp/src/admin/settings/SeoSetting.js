import React, {Component} from 'react'
import eventEmitter from '../../utils/eventEmitter'
import SeoForm from '../seos/SeoForm'
import SeoModel from '../models/seo.model'
import { Form } from 'semantic-ui-react'
import {BtnWithModalEvent} from '../components/form/BtnDefined'
import { withFormBehaviors } from '../components/form/form'
import { SeoDefined } from "../commons/Defined"
import _ from 'lodash'
import Utils from '../../apis/utils'
import SeoActions from '../../store/SeoActions'
import {
    getInputData,
    setFieldValue,
    validatorModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

class SeoSetting extends Component {
    constructor(props){
        super(props)
        this.SeoActions = new SeoActions()
        let { models, isFormValid } = validatorModel(SeoModel.model())
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
            url: `Setting/getGeneralSetting/GeneralSeoSetting`
        }
        eventEmitter.emit('handle-submit-form-data', { isLoading: true })
        this.SeoActions.detailItem(payload, (err, result)=> {
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
        let seoFormData = {
            seoTitle: model[SeoDefined.SEOTITLE].value,
            seoKeys: model[SeoDefined.SEOKEYS].value,
            seoDescription: model[SeoDefined.SEODESCRIPTION].value
        }
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Setting/updateGeneralSetingSeo',
                body: {
                    Value: JSON.stringify(seoFormData),
                    CustomValue: null
                }
            }
            eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({}), ()=>{
                    this.SeoActions.updateItem(payload, (err, result)=> {
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