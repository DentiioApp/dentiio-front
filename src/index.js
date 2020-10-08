import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Cases from './containers/Cases/Cases'
import Favorites from './containers/Favorites/Favorites'
import Profile from './containers/Profile/Profile'
import * as serviceWorker from './serviceWorker'
import { applyMiddleware, compose, createStore } from 'redux'
import { adminReducer } from './store/reducers'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import dotenv from 'dotenv'
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from '@material-ui/core/styles'
import colorTheme from './components/UI/ColorTheme/ColorTheme'
import DetailCase from './containers/DetailCase/DetailCase'
import config from './config'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import CasePost from './containers/CasePost/CasePost'
import QuestionPost from './containers/QuestionPost/QuestionPost'
import UserAvatar from "./containers/UserAvatar/UserAvatar";
dotenv.config()

// MIDDLEWARE
const middleWare = store => next => action => {
  return next(action)
}

export const store = createStore(
  adminReducer,
  compose(
    applyMiddleware(ReduxThunk, middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
  
ReactDOM.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={config.messages.timeOut}>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/cases' component={Cases} />
              <Route path='/case/:id' component={DetailCase} />
              <Route exact path='/favorites' component={Favorites} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/post-question' component={QuestionPost} />
              <Route exact path='/post-case' component={CasePost} />
              <Route exact path='/avatar' component={UserAvatar} />
            </Switch>
          </div>
        </Router>
      </ToastProvider>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)

serviceWorker.register()
