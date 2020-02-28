import React, {Component, Fragment} from 'react'
import SideBar from './SideBar'
import SideBarRight from './SideBarRight'
import Header from './Header'
import Footer from './Footer'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <div className="wrapper">
                    <Header />
                    <SideBar />
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>
                    <SideBarRight />
                    <Footer />
                </div>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout