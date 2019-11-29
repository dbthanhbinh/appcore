import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const SearchSelection = (props) => {
    let { options, placeholder } = props
    return (
        <Dropdown
            placeholder={placeholder || null}
            fluid
            search
            selection
            options={options}
        />
    )
}

export default SearchSelection