import _ from 'lodash'

export function getInputData(e, data){
    let target = (e && e.target) ? e.target : {}
    let name = target && target.name ? target.name : (data && data.name ? data.name : '')
    let value = target && target.value ? target.value : (data && data.value ? data.value : '')
    let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
    let type = target && target.type ? target.type : (data && data.type ? data.type : '')
    if (type === 'checkbox') value = checked ? 1 : 0
    if(type === 'file') value = e.target.files[0]
    return { name, value }
}

export function getEditorData(e){
    let name = 'content'
    let value = ''
    if(e && e.name === 'change' && e.editor) {
        value = e.editor.getData()
    }
    return { name, value }
}

export function setFieldValue(name, value, obj){
    obj.model[name].value = value
    // let { models, isFormValid } = validatorModel(obj.model)
    return validatorModel(obj.model)
}

export function pickKeysFromModel(rawModel){
    let models = rawModel
    let keys = null
    if(models){
        keys = _.keysIn(models)
    }
    return keys
}

export function mappingModelDefaultData(rawModel, defaultObjValue){
    let models = rawModel
    if(models){
        Object.keys(models).forEach((key) => {
            let data = _.get(defaultObjValue, `${key}`)
            if(data) {
                models[key].value = data
            }
        })
    }
    return models
}

export function resetModelDefaultData(rawModel){
    let models = rawModel
    return models
}

export function initValidatorModel(rawModel){
    let models = rawModel ? rawModel.model.bind(this)() : {}
    if(models){
        Object.keys(models).forEach((key) => {
            models[key].isValid = true
            models[key].message = null

            models[key].validators.forEach((item) => {
                if(item.compare === 'required' && _.isEmpty(models[key].value)){
                    models[key].isValid = false
                    models[key].message = item.message
                }
            })
        })
    }
    let _valid = _.some(models, { 'isValid': false }) || false ;
    return { models, isFormValid: !_valid }
}

export function validatorModel(rawModel){
    let models = rawModel ? rawModel : {}
    if(models){
        Object.keys(models).forEach((key) => {
            models[key].isValid = true
            models[key].message = null

            models[key].validators.forEach((item) => {
                if(item.compare === 'required'){
                    if(_.isEmpty(models[key].value)) {
                        models[key].isValid = false
                        models[key].message = item.message
                    }                     
                }
            })
        })
    }
    let _valid = _.some(models, { 'isValid': false });
    return { models, isFormValid: !_valid }
}

export function validatorModelAfterChangeField(rawModel){
    let models = rawModel ? rawModel : {}
    if(models){
        Object.keys(models).forEach((key) => {
            models[key].isValid = true
            models[key].message = null

            models[key].validators.forEach((item) => {
                if(item.compare === 'required'){
                    if(_.isEmpty(models[key].value)) {
                        models[key].isValid = false
                        models[key].message = item.message
                    }                     
                }
            })
        })
    }
    return models
}

export function appendFormData(body) {
    let formData = new FormData()
    if(body && _.isObject(body) && !_.isEmpty(body)) {
        Object.keys(body).forEach((key) => {
            formData.append(`${key}`, body[key])
        })
    }
    return formData
}

export function getFormFieldLabel(){

}

export function findChildIds(listItems, parentId, childIds){
    if(_.isEmpty(listItems)) return []
    let menuObject = []
    listItems.forEach((element, i) => {
        if(element.parentId === parentId){
            menuObject.push({
                id: element.id,
                parentId: element.parentId,
                name: element.name
            })
            listItems = listItems.filter((x) => x.id !== element.id)
        }
    })

    if(menuObject) {
        return menuObject.map((item) => {
            childIds.push(item.id)
            return findChildIds(listItems, item.id, childIds)
        })
    }
}

export function adapterMapingDropdownOption(options){
    if(!options) return []
    let mapOptions = []
    options && options.forEach(item => {
        mapOptions.push({
            key: item.id, text: `${item.name}`, value: item.id
        })
    })
    return mapOptions
}