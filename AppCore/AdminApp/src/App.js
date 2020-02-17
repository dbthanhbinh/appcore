import React from 'react'
import { BrowserRouter, Switch } from "react-router-dom"
import RouteWithAuthenticate from './routes'

import Layout from './layouts'
import DashBoard from './components/dashboard'
import Category from './components/categories'


function App() {
  const prevFixAdmin = '/admin'
  return (
    <BrowserRouter>
      <Switch>
        <RouteWithAuthenticate exact path='/' component={ DashBoard } layout={ Layout } />

        <RouteWithAuthenticate exact path={`${prevFixAdmin}/categories`} component={ Category } layout={ Layout } />

      </Switch>
    </BrowserRouter>
  );
}

export default App
