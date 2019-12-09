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
    let { categoryList, isEdit, currentCatId, parentId } = props
    // reset default parent value
    if(parentId === getDefaultEmptyGuid()){
        parentId = null
    }
    
    let labelParent = 'Select parent'
    let childIds = []  // When isEdit, disable all child elements, that will can not make parentId
    if(isEdit) findChildIds(categoryList, currentCatId, childIds)
    let mapOptions = []
    categoryList && categoryList.forEach(item => {
        mapOptions.push({
            key: item.id,
            text: `${item.name}`,
            value: item.id,
            disabled: (isEdit && ((currentCatId && item.id === currentCatId) || _.includes(childIds, item.id))) ? true : false
        })
    })

    return(
        <Fragment>
            <h5>{ labelParent }</h5>
            <Form.Field>
                <Dropdown
                    placeholder={ labelParent }
                    fluid
                    search
                    selection
                    value={parentId || ''}
                    options={mapOptions}
                />
            </Form.Field>
        </Fragment>
    )
}

export default DropdownAsParentId