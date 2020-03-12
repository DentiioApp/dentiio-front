import React from 'react';
import logo from '../../logo.svg';
import './Home.scss';

import FavButton from "../../components/UI/favButton/FavButton"
import HomeButton from "../../components/UI/homeButton/HomeButton";
import LoginButton from "../../components/UI/loginButton/LoginButton";
import ProfileImage from "../../components/UI/profileImage/ProfileImage";
import SignUpButton from "../../components/UI/signUpButton/SignUpButton";
import TitleHeader from "../../components/UI/titleHeader/TitleHeader"

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <ProfileImage/>
        <HomeButton/>
        <FavButton/>
        <TitleHeader/>
        <SignUpButton/>
        <LoginButton/>
      </header>

      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default Home;