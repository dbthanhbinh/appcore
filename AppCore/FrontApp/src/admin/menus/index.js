import React, { Component, Fragment } from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Menu'
import { withFormBehaviors } from '../components/form/form'

import { Grid } from 'semantic-ui-react'
import MenuList from './ItemList'
import MenuForm from './MenuForm'
import Utils from '../../apis/utils'
import {
    getInputData,
    setFieldValue,
    validatorModel,
    pickKeysFromModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

import MenuActions from '../../store/MenuActions'
import MenuModel from '../models/addMenu.model'
import {MenuDefined} from "../commons/Defined"


class Menu extends Component{
    constructor(props){
        super(props)
        this.MenuActions = new MenuActions()
        let { models, isFormValid } = validatorModel(MenuModel.model())
        this.state = {
            isBtnLoading: false,
            currentRoute: 'menus',
            isFormValid: isFormValid,
            model: models
        }
        this.isEditId = false
        this.handleOnDeleteMenu = this.handleOnDeleteMenu.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnCreateMenu = this.handleOnCreateMenu.bind(this)
        this.handleOnUpdateMenu = this.handleOnUpdateMenu.bind(this)
    }

    componentDidMount(){
        // For Edit case
        let payload = {}
        let { model } = this.state
        let editId = _.get(this.props, 'match.params.id')
        if(editId) {
            this.isEditId = editId
            payload = {
                url: `Menu/getMenuWithEdit/${this.isEditId}`
            }
            this.MenuActions.detailItemWithEdit(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                // Mapping data
                this.setState((prevState)=>{
                    let data = _.get(resultData, 'result')
                    let keysFromMenuModel = pickKeysFromModel(MenuModel.model())
                    let result = _.pick(_.get(data, 'menu'), keysFromMenuModel)
                    let { models, isFormValid } = validatorModel(mappingModelDefaultData(model, result))
                    this.props.detailMenuWithEdit(data)
                    return { model: models, isFormValid }
                })
            })
        } else if(!this.isEditId) {
            // For get all case
            payload = {
                url: 'Menu/getAllMenu',
                body: {}
            }
            this.MenuActions.getListItems(payload, (err, result)=> {
                if(err) return
                let resultData = Utils.getResApi(result)
                resultData = Utils.sortList(resultData, 'desc')  // To sort list
                this.props.fetchMenu(resultData)
            })
        }
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    handleOnCreateMenu(e, data){
        let { model, isFormValid } = this.state
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Menu/createMenu',
                body: { 
                    Name: model[MenuDefined.NAME].value,
                    SubName: model[MenuDefined.SUBNAME].value,
                    Slug: model[MenuDefined.SLUG].value,
                    GroupMenu: model[MenuDefined.GROUPMENU].value,
                    ParentId: model[MenuDefined.PARENTID].value
                }
            }
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.MenuActions.addItem(payload, (err, result)=> {
                    if(err) return
                    let menuData = _.get(Utils.getResApi(result), 'menuData')
                    if(result) this.props.addMenu(menuData)
                })
            }
        }
    }

    handleOnUpdateMenu(id){
        if(!id) return
        let { model } = this.state
        let payload = {
            url: 'Menu/updateMenu',
            body: {
                Name: model.name.value,
                Slug: model.slug.value,
                ParentId: model.parentId.value,
                Id: id
            }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.MenuActions.updateItem(payload, (err, result)=> {
                if(err) return
                if(result) this.props.updateMenu(Utils.getResApi(result))
            })
        }
    }

    handleOnDeleteMenu(id){
        if(!id) return
        let payload = {
            url: 'Menu/deleteMenu',
            body: { Id: id }
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            this.MenuActions.deleteItem(payload, (err, result)=> {
                if(err) return
                if(!err && result) this.props.deleteMenu(id)
            })
        }
    }

    render(){
        let { currentRoute, model, isFormValid } = this.state
        let { menuData } = this.props
        let { menuList, detailData } = menuData
        return (
            <Fragment>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={6}>
                            <MenuForm
                                isFormValid={isFormValid}
                                model={ model }
                                listItems={ menuList }
                                detailData={ detailData }
                                onCreateMenu={this.handleOnCreateMenu}
                                onUpdateMenu = { this.handleOnUpdateMenu }
                                onInputChange={this.handleOnInputChange}
                                isEditId={ this.isEditId }
                                currentRoute={currentRoute}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MenuList
                                isEditId={ this.isEditId }
                                isFormValid={isFormValid}
                                listItems={menuList}
                                onDeleteItem={this.handleOnDeleteMenu}
                                currentRoute={currentRoute}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { menuData } = state.menuData
    return { menuData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withFormBehaviors(Menu, null))

