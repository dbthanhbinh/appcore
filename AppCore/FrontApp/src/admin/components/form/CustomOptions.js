import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'
import { getDefaultEmptyGuid } from '../../../utils/commons'

const CustomOptions = (props) => {
    let { categoryList, name, parentId, isEdit, currentCatId } = props
    if(isEdit && currentCatId && categoryList){
        categoryList = categoryList.filter((f) => f.id !== currentCatId)
    }
    let labelParent = 'Select parent'
    return(
        <Fragment>
            <h5>{ labelParent }</h5>
            <Form.Field name={ name || 'cat' } as='select' value={ parentId || -1 } onChange={ props.onInputChange }>
                <option key={getDefaultEmptyGuid()} value={getDefaultEmptyGuid()}>{ labelParent }</option>
                { categoryList && categoryList.map((item) => {
                    return <option key={ item.id } value={ item.id }>{ item.name }</option>
                }) }
            </Form.Field>
        </Fragment>
    )
}

export default CustomOptions