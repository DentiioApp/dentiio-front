import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Cases from './containers/Cases/cases'
import Favorites from './containers/Favorites/favorites'
import Profile from './containers/Profile/profile'
import * as serviceWorker from './serviceWorker'
// import "bootstrap/dist/css/bootstrap.min.css";
import { applyMiddleware, compose, createStore } from 'redux'
import { adminReducer } from './store/reducers'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import dotenv from 'dotenv'
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from '@material-ui/core/styles'
import colorTheme from './components/UI/colorTheme/colorTheme'
import detailCase from "./containers/DetailCase/detailCase";
import config from "./config"

import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link,
} from 'react-router-dom'

dotenv.config()

// MIDDLEWARE
const middleWare = store => next => action => {
  return next(action)
}

export const store = createStore(adminReducer,
  compose(
    applyMiddleware(ReduxThunk, middleWare)
  )
)

ReactDOM.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={store}>
      <ToastProvider autoDismissTimeout= {config.messages.auth.timeOut} >
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/cases' component={Cases} />
              <Route path='/case/:id' component={detailCase} />
              <Route exact path='/favorites' component={Favorites} />
              <Route exact path='/profile' component={Profile} />
            </Switch>
          </div>
        </Router>
      </ToastProvider>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
