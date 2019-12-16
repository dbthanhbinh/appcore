import React, { Fragment } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import { getDefaultEmptyGuid } from '../../../utils/commons'

// Display dropdownlist, with listItems

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

const DropdownAsParentId = (props) => {
    let { options, name, isEditId, currentCatId, parentId, onChange, placeholder } = props

    let mapOptions = []
    if(isEditId) {
        let childIds = []  // When isEdit, disable all child elements, that will can not make parentId
        findChildIds(options, currentCatId, childIds)
        options && options.forEach(item => {
            mapOptions.push({
                key: item.id, text: `${item.name}`, value: item.id,
                disabled: (isEditId && ((currentCatId && item.id === currentCatId) || _.includes(childIds, item.id))) ? true : false
            })
        })
    } else {
        Object.assign(mapOptions, options)
    }

    return(
        <Fragment>
            <h5>{ placeholder }</h5>
            <Form.Field>
                <Dropdown
                    clearable
                    fluid
                    search
                    selection
                    name={name}
                    value={parentId || ''}
                    options={mapOptions}
                    onChange={onChange}
                    placeholder={ placeholder }
                />
            </Form.Field>
        </Fragment>
    )
}

export default DropdownAsParentId