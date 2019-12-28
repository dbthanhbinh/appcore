import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as Post from './Post'
import * as Category from './Category'
import * as Tag from './Tag'
import * as User from './User'
import * as Media from './Media'
import * as SimCard from './SimCard'
import * as MenuApp from './Menu'
import * as Setting from './Setting'

export default function configureStore(history, initialState) {
  const reducers = {
    postData: Post.reducer,
    userData: User.reducer,
    categoryData: Category.reducer,
    tagData: Tag.reducer,
    mediaData: Media.reducer,
    simCardData: SimCard.reducer,
    menuData: MenuApp.reducer,
    settingData: Setting.reducer
  }

  const middleware = [
    thunk,
    routerMiddleware(history)
  ]

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = []
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )
}
