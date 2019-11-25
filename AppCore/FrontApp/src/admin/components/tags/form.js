import React, { Fragment } from 'react'
import _ from 'lodash'
import { Form, Button } from 'react-bootstrap'
import { withFormBehaviors } from '../form/form'
import TagModel from '../models/addTag.model'
import { TagDefined } from "../commons/Defined";

class TagForm extends React.Component{
    constructor(props){
        super(props)
        const Model = TagModel.model()
        this.state = {
            isLoading: false,
            model: Model
        }
    }

    render(){
        let { isEdit, currentEditId } = this.props
        let { model } = this.state
        let nameLabel = _.get(model, `${TagDefined.NAME}.label`)
        let slugLabel = _.get(model, `${TagDefined.SLUG}.label`)
        
        let nameValue = _.get(model, `${TagDefined.NAME}.value`)
        let slugValue = _.get(model, `${TagDefined.NAME}.value`)
        return(
            <Fragment>
                <a href='admin/tags'>Add new</a>
                <Form>
                    <Form.Group>
                        <Form.Control type='text'
                            placeholder={nameLabel}
                            name='name'
                            onChange={this.props.onInputChange}
                            defaultValue={ nameValue }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text'
                            placeholder={slugLabel}
                            name='slug'
                            onChange={this.props.onInputChange}
                            defaultValue={ slugValue }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={ isEdit ? () => this.props.OnUpdateTag(currentEditId) : this.props.onCreateTag }>
                            Save Changes
                        </Button>
                    </Form.Group>
                </Form>
            </Fragment>
        )
    }
}

export default withFormBehaviors(TagForm, null)