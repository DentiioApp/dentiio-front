import React from 'react'
import Header from '../../components/App/Header/header'
import GradientBtn from "../../components/UI/buttons/GradientBtn";
import {makeStyles} from "@material-ui/core/styles";
import oStyle from "../../components/App/Register/registerStyle";


function logout(){
    localStorage.clear();
    window.location.href = '/';
}



const Profile = () => {


  return (
    <>
        <Header target='profile' />
        <button onClick={logout}>
            Se déconnecter
        </button>

    </>
  )
}

export default Profile
