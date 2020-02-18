import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import { BrowserRouter, Switch } from "react-router-dom"
import RouteWithAuthenticate from './routes'

import Layout from './layouts'
import DashBoard from './components/dashboard'
import Category from './components/categories'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

function App() {
  const prevFixAdmin = '/admin'
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <RouteWithAuthenticate exact path='/' component={ DashBoard } layout={ Layout } />

          <RouteWithAuthenticate exact path={`${prevFixAdmin}/categories`} component={ Category } layout={ Layout } />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App
