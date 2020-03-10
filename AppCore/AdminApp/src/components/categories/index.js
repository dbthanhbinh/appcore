import React, {Component, Fragment} from 'react'
import _ from 'lodash'
// Redux process
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'

import {
    BuildTextField,
    BuildTextAreaField,
    BuildSelectField,
    BuildButtonField
} from '../forms/BuildFormField'

import {
    resetFormFieldByFormId,
    resetModelDefaultData,
    initValidatorModel,
    getInputData,
    setFieldValue,
    validatorModel,
    pickKeysFromModel,
    mappingModelDefaultData
} from '../../utils/FormUtils'

import Model from '../../models/category.model'
import {CategoryDefined} from '../../models/defined.model'
import { withFormBehaviors } from '../../components/forms/form'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: Model.model()
        }

        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }


    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            let { models, isFormValid } = setFieldValue(name, value, prevState)
            return { model: models, isFormValid: isFormValid }
        })
    }

    render() {
        let {model} = this.state
        return(
            <Fragment>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card card-primary">
                            <div className="card-body">
                                <BuildTextField
                                    name={CategoryDefined.NAME}
                                    label={model[CategoryDefined.NAME].label}
                                    placeholder={model[CategoryDefined.NAME].placeholder}
                                    modelField={model[CategoryDefined.NAME]}
                                    onInputChange={}
                                />
                                <BuildTextField
                                    name={CategoryDefined.SLUG}
                                    label={model[CategoryDefined.SLUG].label}
                                    placeholder={model[CategoryDefined.SLUG].placeholder}
                                    modelField={model[CategoryDefined.SLUG]}
                                    onInputChange={}
                                />
                                <BuildSelectField 
                                    name={CategoryDefined.PARENTID}
                                    label={model[CategoryDefined.PARENTID].label}
                                    modelField={model[CategoryDefined.PARENTID]}
                                    defaultValue=''
                                    onChange={}
                                />
                                <BuildTextAreaField
                                    name={CategoryDefined.CONTENT}
                                    label={model[CategoryDefined.CONTENT].label}
                                    placeholder={model[CategoryDefined.CONTENT].placeholder}
                                    modelField={model[CategoryDefined.CONTENT]}
                                    rows={5}
                                    onChange={}
                                />
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <BuildButtonField
                                    label='Create new'
                                    className='btn-success float-right'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card-body p-0">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>File Size</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Functional-requirements.docx</td>
                                    <td>49.8005 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>UAT.pdf</td>
                                    <td>28.4883 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email-from-flatbal.mln</td>
                                    <td>57.9003 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Logo.png</td>
                                    <td>50.5190 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Contract-10_12_2014.docx</td>
                                    <td>44.9715 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    let { categoryData } = state.categoryData
    return { categoryData }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withFormBehaviors(Category, null))