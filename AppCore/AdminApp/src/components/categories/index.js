import React, {Component, Fragment} from 'react'
import {
    BuildTextField,
    BuildTextAreaField,
    BuildSelectField,
    BuildButtonField
} from '../forms/BuildFormField'

import Model from '../../models/category.model'
import {CategoryDefined} from '../../models/defined.model'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: Model.model()
        }
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
                                />
                                <BuildTextField
                                    name={CategoryDefined.SLUG}
                                    label={model[CategoryDefined.SLUG].label}
                                    placeholder={model[CategoryDefined.SLUG].placeholder}
                                />
                                <BuildSelectField 
                                    name={CategoryDefined.PARENTID}
                                    label={model[CategoryDefined.PARENTID].label}
                                    defaultValue=''
                                />
                                <BuildTextAreaField
                                    name={CategoryDefined.CONTENT}
                                    label={model[CategoryDefined.CONTENT].label}
                                    placeholder={model[CategoryDefined.CONTENT].placeholder}
                                    rows={5}
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
                                <tr>
                                    <td>UAT.pdf</td>
                                    <td>28.4883 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                <tr>
                                    <td>Email-from-flatbal.mln</td>
                                    <td>57.9003 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                <tr>
                                    <td>Logo.png</td>
                                    <td>50.5190 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                <tr>
                                    <td>Contract-10_12_2014.docx</td>
                                    <td>44.9715 kb</td>
                                    <td className="text-right py-0 align-middle">
                                    <div className="btn-group btn-group-sm">
                                        <a href="#" className="btn btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-danger"><i className="fas fa-trash"></i></a>
                                    </div>
                                    </td>
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Category