import React, { useEffect } from 'react'
import ReactGA from 'react-ga';
import logo from 'images/logo.svg'
import './App.css'
import { useDispatch } from 'react-redux';

function App () {

const dispatch = useDispatch();
  useEffect(() => {
   
    /// Only in production
    env.executeOnlyIn(env.PRODUCTION, () => {
      // Initialize Google Analytics
      ReactGA.initialize(config.analytics.id);

      // Load ZendDesk after 15s
      // window.setTimeout(zendesk.addWidgetScript, 15000);
    });

    // Only in dev
    env.executeIn(env.DEVELOPMENT, () => {
      // ReactGA.initialize(config.analytics.id, { debug: false });
    });
  }, [dispatch]); // [] ensure this effect is only executed once



  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
