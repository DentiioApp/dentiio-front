import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './containers/Home/Home'
import Cases from './containers/Cases/Cases'
import Favorites from './containers/Favorites/Favorites'
import Profile from './containers/Profile/Profile'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
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
import EditProfile from "./containers/Profile/EditProfile";
import { PersistGate } from 'redux-persist/integration/react'
import ConfigureStore from './store/configureStore'
import CGU from "./containers/CGU/CGU";
dotenv.config() 

// var _route = '/'

// if(window.location.pathname !== _route ) {
 
//   var routes = {
//     'cases' : Cases,
//     'post-case' : CasePost,
//     'cgu' : CGU,
//     'favorites' : Favorites,
//     'profile' : Profile,
//     'avatar' : UserAvatar,
//   }

//   _route = routes[window.location.pathname.replace('/','')] ;
// }

ReactDOM.render(
  <ThemeProvider theme={colorTheme}>
    <Provider store={ConfigureStore().store}>
      <PersistGate loading={null} persistor={ConfigureStore().persistor}>
      <ToastProvider autoDismiss autoDismissTimeout={config.messages.timeOut}>
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
              {/* <Route exact path='/' component={Home} />
              <Route exact path='/cases' component={ _route !== '/' ? _route : Cases}/>
              <Route path='/case/:id' component={ _route !== '/' ? _route : DetailCase}/>
              <Route exact path='/favorites' component={ _route !== '/' ? _route : Favorites}/>
              <Route exact path='/profile' component={ _route !== '/' ? _route : Profile }/>
              <Route exact path='/profile/edit' component={ _route !== '/' ? _route : EditProfile}/>
              <Route exact path='/post-question' component={ _route !== '/' ? _route : QuestionPost}/>
              <Route exact path='/post-case' component={ _route !== '/' ? _route : CasePost}/>
              <Route exact path='/avatar' component={ _route !== '/' ? _route :  UserAvatar}/>
              <Route exact path='/cgu' component={ _route !== '/' ? _route : CGU} /> */}
            </Switch>
          </div>
        </Router>
      </ToastProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)

serviceWorker.register()
