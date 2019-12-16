import React, { Fragment } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const DropdownSelection = (props) => {
    let {
        placeholder,
        multiple,
        options,
        onChange,
        name
    } = props
    
    return(
        <Fragment>
            <h5>{ placeholder }</h5>
            <Form.Field>
                <Dropdown
                    clearable
                    name={name}
                    fluid
                    search
                    selection
                    multiple={multiple}
                    options={options}
                    onChange={onChange}
                    placeholder={ placeholder }
                />
            </Form.Field>
        </Fragment>
    )
}
export default DropdownSelection