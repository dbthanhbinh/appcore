import React, { Component } from 'react'
import { SeoDefined } from '../commons/Defined'
import {
    BuildTextField,
    BuildTextAreaField
} from '../components/form/BuildFormField'

class SeoForm extends Component {
    constructor(props){
        super(props)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
    }

    handleOnInputChange(e, data){
        this.props.onInputChange(e, data)
    }

    render(){
        let { model } = this.props
        return(
            <div className="card card-primary collapsed-card">
                <div className="card-header">
                    <h3 className="card-title">Config SEO</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                        <i className="fas fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="card-body">
                    <BuildTextField
                        name={SeoDefined.SEOTITLE}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEOTITLE] : null}
                    />
                    <BuildTextField
                        name={SeoDefined.SEOKEYS}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEOKEYS] : null}
                    />
                    <BuildTextAreaField
                        name={SeoDefined.SEODESCRIPTION}
                        onChange={this.handleOnInputChange}
                        modelField={model ? model[SeoDefined.SEODESCRIPTION] : null}
                    />
                </div>
            </div>
        )
    }
}
export default SeoForm