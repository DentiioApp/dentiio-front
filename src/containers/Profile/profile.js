import React from 'react'
import Header from '../../components/App/Header/header'


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
