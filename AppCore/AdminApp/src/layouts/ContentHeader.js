import React, {Component, Fragment} from 'react'

class ContentHeader extends Component {
    render() {
        return(
            <Fragment>
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard v3</h1>
                        </div>
                        <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard v3</li>
                        </ol>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ContentHeader