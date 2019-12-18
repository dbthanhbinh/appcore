import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <Grid.Row className="justify-content-md-center">
                        <Grid.Column md={4}>
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