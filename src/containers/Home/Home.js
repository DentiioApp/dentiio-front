import './Home.scss'

import React from 'react'
//import Account from '../Account/account'
import SignIn from '../../components/App/SignIn/signIn'
import Register from '../../components/App/Register/register'
import Header from '../../components/App/Header/header'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const username = useSelector(state => state.username)

  var auth
  var action = '';
  
  if (props.location.state === undefined){
    action ='inscription';
  }else{

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

  if (username !== '') {
    return (<Redirect to="/account" />)
  }

  return (
    <div className='App'>
      <Header  content={action} />
      {auth}

    </div>
  )
}

export default Home
