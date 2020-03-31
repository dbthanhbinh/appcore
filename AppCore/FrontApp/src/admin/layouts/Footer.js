import React, {Component, Fragment} from 'react'

class Footer extends Component {
    render() {
        return(
            <Fragment>
                <footer className="main-footer">
                    <strong>Copyright &copy; 2019-2020 <a href="">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0.0
                    </div>
                </footer>
            </Fragment>
        )
    }
}

export default Footer