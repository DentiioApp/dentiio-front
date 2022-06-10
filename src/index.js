import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Cases from './containers/Cases/Cases'
import Favorites from './containers/Favorites/Favorites'
import {useLocation} from "react-router-dom";
import Profile from './containers/Profile/Profile'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from '@material-ui/core/styles'
import colorTheme from './components/UI/ColorTheme/ColorTheme'
import DetailCase from './containers/DetailCase/DetailCase'
import {_config} from './config/index'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import CasePost from './containers/CasePost/CasePost'
import QuestionPost from './containers/QuestionPost/QuestionPost'
import UserAvatar from "./containers/UserAvatar/UserAvatar";
import EditProfile from "./containers/Profile/EditProfile";
import { PersistGate } from 'redux-persist/integration/react'
import CGU from "./containers/CGU/CGU";
import {applyMiddleware, compose, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {adminReducer} from './store/reducers'
import ReduxThunk from "redux-thunk";
dotenv.config() 

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, adminReducer)

// MIDDLEWARE
const middleWare = store => next => action => {
    return next(action)
}
let store = createStore(
  persistedReducer,
  compose(
      applyMiddleware(ReduxThunk, middleWare),
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))
let persistor = persistStore(store)

ReactDOM.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastProvider autoDismiss autoDismissTimeout={_config.messages.timeOut}>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/cases' component={Cases}/>
              <Route path='/case/:id' component={DetailCase}/>
              <Route exact path='/favorites' component={Favorites}/>
              <Route exact path='/profile' component={Profile }/>
              <Route exact path='/profile/edit' component={EditProfile}/>
              <Route exact path='/post-question' component={QuestionPost}/>
              <Route exact path='/post-case' component={CasePost}/>
              <Route exact path='/avatar' component={UserAvatar}/>
              <Route exact path='/cgu' component={CGU} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
      </ToastProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)

function NoMatch() {
  let location = useLocation();
  
  return (
    <div>
      <h3>
        OUps <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
serviceWorker.register()
