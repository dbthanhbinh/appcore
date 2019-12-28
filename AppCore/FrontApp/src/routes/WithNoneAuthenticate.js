import React from 'react'
import { Route } from "react-router-dom"
import { Cookies } from 'react-cookie'

const fakeAuth = {
    isAuthenticated: false
}

const WithNoneAuthenticate = ({layout: Layout, component: Component, ...rest }) => {
    let cookies = new Cookies().get('MAP_cookies')
    let myCookies = (cookies && cookies.token) ? cookies.token : ''
    if(myCookies) { fakeAuth.isAuthenticated = true }

    return <Route {...rest} render = {
        props => (
            <Layout>
                <Component {...props} {...rest}/>
            </Layout>
        )}
        />
}

export default WithNoneAuthenticate