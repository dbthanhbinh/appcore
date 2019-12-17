import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import Navitem from '../Nav'
// import Sidebar from './Sidebar'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <Grid.Row>
                        
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column md={3}>
                            <Navitem />
                        </Grid.Column>
                        <Grid.Column md={9}>
                            <div className='main-contents'>
                                {this.props.children}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout