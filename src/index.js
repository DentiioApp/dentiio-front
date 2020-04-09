import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Account from './containers/Account/account'
import * as serviceWorker from './serviceWorker'
// import "bootstrap/dist/css/bootstrap.min.css";
import { applyMiddleware, compose, createStore } from 'redux'
import { adminReducer } from './store/reducers'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link,
} from 'react-router-dom'

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
  <Provider store={store}>
    <Router>
      <div>
        {/* <nav>
                    <ul>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>
                        <li>
                            <Link to="/">
                                Login
                            </Link>
                        </li>
                    </ul>
               </nav>
               */}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/account' component={Account} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
