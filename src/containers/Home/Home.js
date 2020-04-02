import './Home.scss';

import React from 'react';
import Auth from '../../components/App/Auth/auth';
import Header from '../../components/App/Header/header';


var auth ;
//Ici nous allons tester si l'utilisateur est connecté
if(true){
  auth = <Auth />;
}

const Home = () => {
  return (
    <div className='App'>
      <Header />
      {auth}
      
    </div>
  )
}

export default Home
