import React, { Fragment } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { TagDefined } from "../commons/Defined"
import BuildTextField from '../components/form/BuildTextField'

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
                        <Button variant="primary"
                            loading={isLoading}
                            disabled={isLoading}
                            onClick={ isEdit ? () => onUpdateTag(currentEditId) : onCreateTag }>
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default TagForm