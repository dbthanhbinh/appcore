import React, {Component, Fragment} from 'react'
import SideBar from './SideBar'
import SideBarRight from './SideBarRight'
import Header from './Header'
import ContentHeader from './ContentHeader'
import Footer from './Footer'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <div className="wrapper">
                    <Header />
                    <SideBar />
                    <div className="content-wrapper">
                        <ContentHeader />
                        <div className="content">
                            <div className="container-fluid">
                            {this.props.children}
                            </div>
                        </div>
                    </div>
                    <SideBarRight />
                    <Footer />
                </div>
            </Fragment>
        )
    }
}

export default Layout