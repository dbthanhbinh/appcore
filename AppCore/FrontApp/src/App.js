import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './styles/App.scss'
// import { Route } from "react-router-dom"
import WithAuthenticate from './routes/WithAuthenticate'
import WithNoneAuthenticate from './routes/WithNoneAuthenticate'

// For admin
import ALayout from './admin/layouts/Layout'
import UnLayout from './admin/layouts/UnLayout'

import Setting from './admin/settings'
import PostApp from './admin/posts'
import PostEditApp from './admin/posts/EditPostForm'
import Category from './admin/categories'
// import Tags from './admin/tags'
import Login from './admin/users/Login'
import Register from './admin/users/Register'
import Users from './admin/users'
import Roles from './admin/roles'

import Media from './admin/medias'
// import MenuApp from './admin/menus'
import NotFound from './admin/components/notfound/404'

// For Frontend
import FLayout from './frontend/layouts/Layout'
import Home from './frontend/home'
// import About from './frontend/pages/About'
// import Contact from './frontend/pages/Contact'

import { Cookies } from 'react-cookie'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const fakeAuth = {
  isAuthenticated: false
}

function App() {
  let cookies = new Cookies().get('MAP_cookies')
  let myCookies = (cookies && cookies.token) ? cookies.token : ''
  if(myCookies) { fakeAuth.isAuthenticated = true }


  let appLayout = UnLayout
  if(fakeAuth.isAuthenticated){
    appLayout = FLayout
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <WithNoneAuthenticate exact path='/member/login' component={ Login } layout={ UnLayout }/>
          <WithNoneAuthenticate exact path='/member/register' component={ Register } layout={ UnLayout }/>

          <WithAuthenticate exact path='/admin/users' component={ Users } layout={ ALayout }/>
          <WithAuthenticate exact path='/admin/roles' component={ Roles } layout={ ALayout }/>

          <WithAuthenticate exact path='/admin/categories' component={Category } layout={ ALayout } />
          <WithAuthenticate exact path='/admin/categories/edit/:id' component={ Category } layout={ ALayout } />

          <WithAuthenticate exact path='/admin/posts' component={ PostApp } layout={ ALayout }/>
          <WithAuthenticate exact path='/admin/posts/edit/:id' component={ PostEditApp } layout={ ALayout }/>
          <WithAuthenticate exact path='/admin/settings' component={ Setting } layout={ ALayout }/>
          <WithAuthenticate exact path='/admin/medias' component={ Media } layout={ ALayout }/>

          <WithAuthenticate exact path='/' component={ Home } layout={appLayout}/>
          <Route exact render={ () => NotFound } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
