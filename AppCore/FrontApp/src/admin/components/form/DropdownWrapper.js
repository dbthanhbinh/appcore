import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Dropdown } from 'semantic-ui-react'

const findChildIds = (listItems, parentId, childIds) => {
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

const adapterMapingDropdownOption = (options, isEditId) => {
    let mapOptions = []
    let childIds = []  // When isEdit, disable all child elements, that will can not make parentId
    if(isEditId) {
        findChildIds(options, isEditId, childIds)
    }
    options && options.forEach(item => {
        mapOptions.push({
            key: item.id, text: `${item.name}`, value: item.id,
            disabled: (isEditId && ((isEditId && item.id === isEditId) || _.includes(childIds, item.id))) ? true : false
        })
    })
    return mapOptions
}

const DropdownWrapper = (props) => {
    
    let {
        isEditId,
        defaultValue,
        placeholder,
        multiple,
        options,
        onChange,
        name,
    } = props
    
    let _defaultValues = defaultValue
    let mapOptions = adapterMapingDropdownOption(options, isEditId)
    if(multiple){
        if(defaultValue){
            _defaultValues = []
            _defaultValues.push(defaultValue)
        }   
    }
    console.log('=====hh', mapOptions)
    return(
        <Fragment>
            <h5>{ placeholder }</h5>
            <Form.Field>
                {
                    isEditId
                    ? (
                        multiple
                        ? <Dropdown
                            clearable
                            fluid
                            search
                            selection
                            multiple
                            name={name}
                            options={mapOptions}
                            onChange={onChange}
                            placeholder={ placeholder }
                            defaultValue={['fbf5c9cf-acc1-413d-bdbb-3bd30f4c5ba3','ab9cc869-ad6e-4d19-809c-f5835d643422']}
                        />
                        : <Dropdown
                            clearable
                            fluid
                            search
                            selection
                            name={name}
                            options={mapOptions}
                            onChange={onChange}
                            placeholder={ placeholder }
                            value={`${_defaultValues}`}
                        />
                    )
                    : (
                        multiple
                        ? <Dropdown
                            clearable
                            name={name}
                            fluid
                            search
                            selection
                            multiple
                            options={mapOptions}
                            onChange={onChange}
                            placeholder={ placeholder }
                        />
                        : <Dropdown
                            clearable
                            name={name}
                            fluid
                            search
                            selection
                            options={mapOptions}
                            onChange={onChange}
                            placeholder={ placeholder }
                        />
                    )
                }
            </Form.Field>
        </Fragment>
    )
}
export default DropdownWrapper