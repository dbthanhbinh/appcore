import React, { Fragment } from 'react'
import { TagDefined } from "../commons/Defined"
import {
    BuildButtonField,
    BuildFileField,
    BuildTextField
} from '../components/form/BuildFormField'

class TagForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        let {
            isEdit,
            currentEditId,
            model,
            onInputChange,
            onUpdateTag,
            onCreateTag,
            isLoading
        } = this.props
        return(
            <Fragment>
                {isEdit && <a href='admin/tags'>Add new</a>}
                <form>
                    <BuildTextField
                        name={TagDefined.NAME}
                        placeholder={TagDefined.NAME}
                        onChange={onInputChange}
                        modelField={model[TagDefined.NAME]}
                    />
                    <BuildTextField
                        name={TagDefined.SLUG}
                        placeholder={TagDefined.SLUG}
                        onChange={onInputChange}
                        modelField={model[TagDefined.SLUG]}
                    />
                    <BuildButtonField
                        disabled={isLoading}
                        onClick={ isEdit ? () => onUpdateTag(currentEditId) : onCreateTag }
                        name='btn-add-newtag'
                        className='btn btn-success float-right'
                        label='Save Changes'
                    />
                </form>
            </Fragment>
        )
    }
}

export default TagForm