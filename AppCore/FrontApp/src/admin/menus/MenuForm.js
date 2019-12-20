import React, { Fragment } from 'react'
import _ from 'lodash'

import { Form, Button } from 'semantic-ui-react'
import DropdownWrapper from '../components/form/DropdownWrapper'
import { MenuDefined } from "../commons/Defined"
import { GroupMenuDefined } from "./commons"

import BuildTextField from '../components/form/BuildTextField'
import {BtnAddNew} from '../components/form/BtnDefined'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
        let {
            currentRoute,
            detailData,
            isEditId,
            listItems,
            isFormValid,
            model,
            onInputChange,
            onUpdateMenu,
            onCreateMenu
        } = this.props
        
        let defaultGroupMenu = null
        let defaultParentId = null
        if(detailData){
            defaultGroupMenu = _.get(model, `${MenuDefined.GROUPMENU}.value`)
            defaultParentId = _.get(model, `${MenuDefined.PARENTID}.value`)
        }
        return(
            <Fragment>
                <BtnAddNew currentRoute={currentRoute}/>
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
                        <DropdownWrapper
                            isEditId={isEditId}
                            options={GroupMenuDefined}
                            name={MenuDefined.GROUPMENU}
                            onChange={onInputChange}
                            value={defaultGroupMenu} // current value of dropdown
                            placeholder={'Select group menu '}
                        />
                    </Form.Field>
                    <Form.Field>
                        <DropdownWrapper
                            isEditId={isEditId}
                            options={listItems}
                            name={MenuDefined.PARENTID}
                            onChange={onInputChange}
                            value={defaultParentId} // current value of dropdown
                            placeholder={'Select parent '}
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