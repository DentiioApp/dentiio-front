import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Cases from './containers/Cases/Cases'
import Favorites from './containers/Favorites/Favorites'
import Profile from './containers/Profile/Profile'
import * as serviceWorker from './serviceWorker'
import { setup } from './services/Auth'
// import "bootstrap/dist/css/bootstrap.min.css";
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

dotenv.config()

// MIDDLEWARE
const middleWare = store => next => action => {
  return next(action)
}

const setUp = setup()

export const store = createStore(
  adminReducer,
  compose(
    applyMiddleware(ReduxThunk, middleWare)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
              <Route exact path='/cases' component={setUp ? Cases : Home} />
              <Route path='/case/:id' component={DetailCase} />
              <Route exact path='/favorites' component={setUp ? Favorites : Home} />
              <Route exact path='/profile' component={setUp ? Profile : Home} />
              <Route exact path='/post-question' component={QuestionPost} />
              <Route exact path='/post-case' component={CasePost} />
            </Switch>
          </div>
        </Router>
      </ToastProvider>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)

serviceWorker.register()
