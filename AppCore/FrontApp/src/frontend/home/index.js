import React from 'react'
import { Grid } from 'semantic-ui-react'
import SimCard from '../components/simcards/fe/index'

class Home extends React.Component {
    render(){
        return(
            <React.Fragment>
                <Grid.Row>
                    <SimCard />
                </Grid.Row>
            </React.Fragment>
        )
    }
}

export default Home