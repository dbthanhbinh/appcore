import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Button } from 'semantic-ui-react'
import { TagDefined } from "../commons/Defined"
import BuildTextField from '../components/form/BuildTextField'

class TagForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let {
            isEdit,
            currentEditId,
            model,
            onInputChange,
            onUpdateTag,
            onCreateTag
        } = this.props
        return(
            <Fragment>
                <a href='admin/tags'>Add new</a>
                <Form>
                    <Form.Field>
                        <BuildTextField
                            name={TagDefined.NAME}
                            onChange={onInputChange}
                            modelField={model[TagDefined.NAME]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={TagDefined.SLUG}
                            onChange={onInputChange}
                            modelField={model[TagDefined.SLUG]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button variant="primary" onClick={ isEdit ? () => onUpdateTag(currentEditId) : onCreateTag }>
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default TagForm