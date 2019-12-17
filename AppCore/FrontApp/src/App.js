import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import { BrowserRouter } from "react-router-dom"
import './styles/App.scss'
// import { Route } from "react-router-dom"
import AppRoute from './routes/AppRoute'

// For admin
import ALayout from './admin/components/layouts/Layout'
import UnLayout from './admin/components/layouts/UnLayout'
import PostApp from './admin/components/posts'
import PostEditApp from './admin/components/posts/PostForm1'
import Category from './admin/components/categories'
import Tags from './admin/components/tags'
// import Register from './admin/components/users/Register'
import Login from './admin/components/users/Login'
// import NotFound from './admin/components/Notfound/404'
import Media from './admin/components/medias'

import MenuApp from './admin/components/menus'

// For Frontend
import FLayout from './frontend/layouts/Layout'
import Home from './frontend/home'
import About from './frontend/pages/About'
import Contact from './frontend/pages/Contact'

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
        <AppRoute exact path='/admin/posts' component={ PostApp } layout={ ALayout }/>
        <AppRoute exact path='/admin/posts/edit/:id' component={ PostEditApp } layout={ ALayout } />
        
        <AppRoute exact path='/admin/categories' component={Category } layout={ ALayout } />
        <AppRoute exact path='/admin/categories/edit/:id' component={ Category } layout={ ALayout } />

        <AppRoute exact path='/admin/tags' component={Tags } layout={ ALayout } />
        <AppRoute exact path='/admin/tags/edit/:id' component={Tags } layout={ ALayout } />
        <AppRoute exact path='/admin/medias' component={ Media } layout={ ALayout }/>

        <AppRoute exact path='/admin/menus' component={ MenuApp } layout={ ALayout }/>
        <AppRoute exact path='/admin/menus/edit/:id' component={MenuApp } layout={ ALayout } />

        <AppRoute exact path='/' component={ Home } layout={ appLayout }/>
        <AppRoute exact path='/about' component={ About } layout={ appLayout }/>
        <AppRoute exact path='/contact' component={ Contact } layout={ appLayout }/>

        <AppRoute exact path='/user/login' component={ Login } layout={ UnLayout }/>

        {/* <AppRoute exact path='/user/login' component={ Login } layout={ UnLayout }/> */}
        {/* <AppRoute exact path='/user/login' component={ Login } layout={ UnLayout } /> */}

        {/* <AppRoute exact path='/admin/posts' component={ PostApp } layout={ appLayout }/>
        
        <AppRoute exact path='/admin/categories' component={ Category } layout={ appLayout } />
        <AppRoute exact path='/admin/categories/edit/:id' component={ Category } layout={ appLayout } />
        <AppRoute exact path='/admin/medias' component={ Media } layout={ appLayout }/>

        <AppRoute exact path='/' component={ Home } layout={ appLayout }/>
        <AppRoute exact path='/about' component={ About } layout={ appLayout }/>
        <AppRoute exact path='/contact' component={ Contact } layout={ appLayout }/> */}
        

        {/* For Front end */}
        {/* <FLayout>
          <Route exact path='/' component={ Home } />
          <Route exact path='/about' component={ About } />
          <Route exact path='/contact' component={ Contact } />
        </FLayout> */}

        {/* <AppRoute exact path='/' component={ Home } layout={ Layout }/> */}
        {/* <AppRoute exact path='/admin/posts' component={ PostApp } layout={ FLayout }/>
        <AppRoute exact path='/admin/categories' component={ Category } layout={ FLayout } />
        <AppRoute exact path='/admin/categories/edit/:id' component={ Category } layout={ FLayout } />
        <AppRoute exact path='/admin/medias' component={ Media } layout={ FLayout }/> */}

        {/* For backend admin */}

        {/* None protected route */}
        {/* <UnLayout>
          <Route path='/user/register' component={ Register } />
          <Route path='/user/login' component={ Login } />
          <Route path="*" component={ NotFound } />
        </UnLayout> */}


      </BrowserRouter>
    </Provider>
  )
}

export default App
