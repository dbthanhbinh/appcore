import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import Navitem from '../Nav'
import LeftNav from '../LeftNav'
import Loading from '../commons/Loading'

class Layout extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                            <Navitem />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                                <LeftNav />
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <div className='main-contents'>
                                    {this.props.children}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Loading />
            </Fragment>
        )
    }
}

export default Layout