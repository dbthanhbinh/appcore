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

const DropdownWrapper = (props) => {
    let {
        isEditId,
        parentId,
        placeholder,
        multiple,
        options,
        onChange,
        name
    } = props
    
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

    return(
        <Fragment>
            <h5>{ placeholder }</h5>
            <Form.Field>
                {
                    isEditId
                    ? <Dropdown
                        isEditId
                        clearable
                        fluid
                        search
                        selection
                        name={name}
                        multiple={multiple}
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
                        multiple={multiple}
                        options={mapOptions}
                        onChange={onChange}
                        placeholder={ placeholder }
                    />
                }
            </Form.Field>
        </Fragment>
    )
}
export default DropdownWrapper