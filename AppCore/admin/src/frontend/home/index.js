import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SimCard from '../components/simcards/fe/index'

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <Row>
                    <SimCard />
                </Row>
            </React.Fragment>
        )
    }
}

export default Home