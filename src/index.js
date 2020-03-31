import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import LandingPage from "./containers/Landing-Page/LandingPage";

ReactDOM.render(<LandingPage />, document.getElementById('root'));

serviceWorker.unregister();
