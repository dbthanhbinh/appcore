import React from 'react'
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

function resizeImage(image, maxWidth, maxHeight, quality) {
    var canvas = document.createElement('canvas');

    var width = image.width;
    var height = image.height;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
    }

    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
}

function resize (file, maxWidth, maxHeight, fn) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        var dataUrl = event.target.result;

        var image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
            fn(resizedDataUrl);
        };
    };
}

class SeoSetting extends BaseSetting {
    constructor(props){
        super(props)
        let { models, isFormValid } = validatorModel(Model.model())
        this.state = {
            model: models,
            isFormValid: isFormValid
        }
        this.settingName = 'GeneralSetting'
        this.AutoLoad = 'Yes'
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleOnChangeUpload = this.handleOnChangeUpload.bind(this)
    }

    handleOnChangeUpload(e){
        var files = e.target.files;
        var self = this;
        var maxWidth = 300;
        var maxHeight = 300;
        resize(files[0], maxWidth, maxHeight, function (resizedDataUrl) {
            self.setState({ dataUrl: resizedDataUrl });
        });
    }

    handleSubmitForm(){
        let {isFormValid} = this.props
        let { model } = this.state
        let formData = {
            webSlogan: model[GeneralSettingDefined.WEB_SLOGAN].value,
            googleAnalyticCode: model[GeneralSettingDefined.GOOGLEANALYTICCODE].value,
            copyrightText: model[GeneralSettingDefined.COPYRIGHTTEXT].value
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
            <Form>
                <Form.Field>
                    {/* <input type='file' name='file' id='file' onChange={this.handleOnChangeUpload} /> */}
                    <BuildTextField
                        name={GeneralSettingDefined.WEB_SLOGAN}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[GeneralSettingDefined.WEB_SLOGAN] : null}
                    />
                </Form.Field>
                <Form.Field>
                    {/* <input type='file' name='file' id='file' onChange={this.handleOnChangeUpload} /> */}
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