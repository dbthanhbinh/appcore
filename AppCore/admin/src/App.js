import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import AppRoute from '../src/components/layouts/AppRoute'
import { Route } from "react-router-dom"

import Layout from './components/layouts/Layout'
import UnLayout from './components/layouts/UnLayout'
import Home from './frontend/home'
import PostApp from './components/posts'
import Category from './components/categories'
import Register from './components/users/Register'
import Login from './components/users/Login'
import NotFound from './components/Notfound/404'
import Media from './components/medias'

import FLayout from './frontend/layouts/Layout'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* For Front end */}
        <FLayout>
          <Route exact path='/' component={ Home } />
        </FLayout>

        {/* <AppRoute exact path='/' component={ Home } layout={ Layout }/> */}
        <AppRoute exact path='/posts' component={ PostApp } layout={ Layout }/>
        <AppRoute exact path='/categories' component={ Category } layout={ Layout } />
        <AppRoute exact path='/categories/edit/:id' component={ Category } layout={ Layout } />
        <AppRoute exact path='/medias' component={ Media } layout={ Layout }/>
        
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
