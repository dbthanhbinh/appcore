import React, {Component, Fragment} from 'react'

class Footer extends Component {
    render() {
        return(
            <Fragment>
                <footer className="main-footer">
                    <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.0.3-pre
                    </div>
                </footer>
            </Fragment>
        )
    }
}

export default Footer