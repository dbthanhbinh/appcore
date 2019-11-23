import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form } from 'react-bootstrap'

const CustomOptions = (props) => {
    let { categoryList, name, parentId, isEdit, currentCatId } = props
    if(isEdit && currentCatId){
        categoryList = categoryList.filter((f) => f.id !== currentCatId)
    }
    let labelParent = 'Select parent'
    return(
        <Fragment>
            <h5>{ labelParent }</h5>
            <Form.Control name={ name || 'cat' } as='select' value={ parentId || -1 } onChange={ props.onInputChange }>
                <option key='-1' value=''>{ labelParent }</option>
                { categoryList && categoryList.map((item) => {
                    return <option key={ item.id } value={ item.id }>{ item.name }</option>
                }) }
            </Form.Control>
        </Fragment>
    )
}

export default CustomOptions