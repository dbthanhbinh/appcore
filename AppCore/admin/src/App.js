import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import Layout from './components/Layout'
import UnLayout from './components/UnLayout'
import Home from './components/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'
import AppRoute from '../src/components/AppRoute'

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
        <AppRoute exact path='/' component={Home} layout={Layout}/>
        <AppRoute path='/user/register' component={ Register } layout={UnLayout} />
        <AppRoute path='/user/login' component={ Login } layout={UnLayout} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
