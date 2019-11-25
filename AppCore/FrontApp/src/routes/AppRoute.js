import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { Cookies } from 'react-cookie'

const fakeAuth = {
    isAuthenticated: false
}

const AppRoute = ({layout: Layout, component: Component, ...rest }) => {
    let cookies = new Cookies().get('MAP_cookies')
    let myCookies = (cookies && cookies.token) ? cookies.token : ''
    if(myCookies) { fakeAuth.isAuthenticated = true }

    return <Route
        {...rest}
        render = {props=>(
            <Layout>
                <Component {...props} {...rest}/>
            </Layout>
            
            // (fakeAuth.isAuthenticated === true && rest.path === '/user/login')
            // ? <Layout>
            //     <Component {...props} {...rest}/>
            //  </Layout>
            // : <Redirect to={{
            //     pathname: '/user/login',
            //     state: { from: props.location }
            //   }} />
        )}
    /> 
}

export default AppRoute