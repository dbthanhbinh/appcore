import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import DropdownAsParentId from '../form/DropdownAsParentId'
import DropdownSelection from '../form/DropdownSelection'
import { MenuDefined } from "../commons/Defined"
import { GroupMenuDefined } from "./commons"

import BuildTextField from '../form/BuildTextField'
import { getDefaultEmptyGuid } from '../../../utils/commons'
import { format } from 'path'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let {
            detailData,
            isEditId,
            listItems,
            isFormValid,
            model,
            onInputChange,
            onUpdateMenu,
            onCreateMenu
        } = this.props

        let parentIdValue = _.get(model, `${MenuDefined.PARENTID}.value`) || getDefaultEmptyGuid()
        let groupMenuValue = _.get(model, `${MenuDefined.GROUPMENU}.value`) || ''
        return(
            <Fragment>
                <a href='admin/categories'>Add new</a>
                <Form>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.NAME}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.NAME]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.SUBNAME}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.SUBNAME]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.SLUG}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.SLUG]}
                        />
                    </Form.Field>
                    {/* <Form.Field>
                        <BuildTextField
                            name={MenuDefined.ICONCLASS}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.ICONCLASS]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.ICONPATH}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.ICONPATH]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.TARGET}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.TARGET]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.STANDARURL}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.STANDARURL]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.CUSTOMURL}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.CUSTOMURL]}
                        />
                    </Form.Field>
                    <Form.Field>
                        <BuildTextField
                            name={MenuDefined.OBJECTTYPE}
                            onChange={onInputChange}
                            modelField={model[MenuDefined.OBJECTTYPE]}
                        />
                    </Form.Field> */}
                    <Form.Field>
                        <DropdownSelection
                            placeholder={'Select group menu '}
                            name={MenuDefined.GROUPMENU}
                            onChange={onInputChange}
                            options={GroupMenuDefined}
                        />
                    </Form.Field>
                    <Form.Field>
                        <DropdownAsParentId
                            isEditId={isEditId}
                            options={listItems}
                            name={MenuDefined.PARENTID}
                            parentId={parentIdValue}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                    

                    <Form.Field>
                        <Button variant="primary"
                            disabled={!isFormValid}
                            onClick={isEditId ? () => onUpdateMenu(isEditId) : onCreateMenu} >
                            Save Changes
                        </Button>
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default CategoryForm