import React from 'react'
import { Route } from "react-router-dom"

const RouteWithAuthenticate = ({layout: Layout, component: Component, ...rest }) => {
    return <Route {...rest} render = {
            props => (
                <Layout>
                    <Component {...props} {...rest}/>
                </Layout>
            )}
        />
}

export default RouteWithAuthenticate