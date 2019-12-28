import React from 'react'
import eventEmitter from '../../utils/eventEmitter'
import _ from 'lodash'
import Utils from '../../apis/utils'
import SettingActions from '../../store/SettingActions'
import {
    getInputData,
    setFieldValue,
    validatorModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

class BaseSetting extends React.Component {
    constructor(props){
        super(props)
        this.SettingActions = new SettingActions()
        this.state = {}
        this.settingName = null
        this.handleSubmitFormSupper = this.handleSubmitFormSupper.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    componentDidMount(){
        let {model} = this.state
        if(this.settingName){
            let payload = {
                url: `Setting/getGeneralSetting/${this.settingName}`
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
    }

    handleOnInputChange(e, data){        
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleSubmitFormSupper(payload){
        let { model } = this.state
        eventEmitter.emit('handle-submit-form-data', { isLoading: true })
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.setState(()=>({}), ()=>{
                this.SettingActions.updateItem(payload, (err, result)=> {
                    if(err) return

                    let generalSetting = null
                    if(result && result.data && result.data.value) {
                        generalSetting = JSON.parse(result.data.value)
                    }
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, generalSetting))
                    this.setState(()=>{
                        return { model: models, isFormValid }
                    })
                    eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            })
        }
    }

    render(){
        return null
    }
}

export default BaseSetting