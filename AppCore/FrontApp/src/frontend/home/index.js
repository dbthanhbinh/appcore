import React from 'react'
import { Grid } from 'semantic-ui-react'
// import SimCard from '../components/simcards/fe/index'

class Home extends React.Component {
    render(){
        return(
            <Grid.Row  columns={3} className='app-main-body'>
                <Grid.Column width={3}>
                    {/* <LSidebar /> */}
                </Grid.Column>
                <Grid.Column width={10} className='main-contents'>
                    <Grid.Row>
                        {/* <SimCard /> */}
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column  width={3}>
                    {/* <RSidebar /> */}
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default Home