import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Dropdown } from 'semantic-ui-react'

const DropdownWrapper = (props) => {
    let {defaultValue} = props
    let otherProps = _.omit(props, ['isEditId', 'isEditAble', 'defaultValue'])
    return(
        <Fragment>
            <h5>{ props.placeholder }</h5>
            <Form.Field>
                <Dropdown
                    clearable
                    fluid
                    selection    
                    {...otherProps}
                    value={defaultValue}
                />
            </Form.Field>
        </Fragment>
    )
}
export default DropdownWrapper