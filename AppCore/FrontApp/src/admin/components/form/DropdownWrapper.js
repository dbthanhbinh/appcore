import React, { Fragment } from 'react'
import _ from 'lodash'

const DropdownWrapper = (props) => {
    let {defaultValue} = props
    let otherProps = _.omit(props, ['isEditId', 'isEditAble', 'defaultValue'])
    return(
        <Fragment>
            <h5>{ props.placeholder }</h5>
            <select
                clearable
                fluid
                selection    
                {...otherProps}
                value={defaultValue}
            />
        </Fragment>
    )
}
export default DropdownWrapper