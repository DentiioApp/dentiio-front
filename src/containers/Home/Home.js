import './Home.scss'

import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import Header from '../../components/App/Header/header'
import Register from '../../components/App/Register/register'
import SignIn from '../../components/App/SignIn/signIn'

const Home = (props) => {
//console.log('TEST§HOME 1 :', props)
  const user = useSelector(state => state.user)
  var auth
  var action = '';
  
  if (props.location.state === undefined){
    action ='inscription';
  } else{
    if(props.location.state.content === "connexion"){
      action = 'connexion';
    } else{
      action ='inscription'
    }
  }

  if (action === 'inscription') {
    auth = <Register />
  }

  if (action === 'connexion') {
    auth = <SignIn />
  } 

  if (user.username !== undefined){
    if(user.connected === false){
      auth = <SignIn />
    }else{
      return <Redirect to="/account" />
    }
  };

  return (
    <div className='App'>
      <Header  content={action} />
      {auth}

    </div>
  )
}

export default Home
