import React from 'react'
import './Home.scss'
import Header from '../../components/App/header/Header'
import Insta from '../../images/Instagram.png'
import Fb from '../../images/Facebook.png'
import In from '../../images/linkedin.png'
import Illus from '../../images/illus.png'


function Home () {
  return (
    <div className='App'>
      <Header />
        <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"/>
        <div className='container'>
            <div className='item illusbloc'>
                <img className='illus' src={Illus}/>
            </div>
            <div className='item'>
                <h1>Cas Cliniques & Diagnostics Dentaire</h1>
                <ul className="block1_text_list">
                    <li className="block1_text_list">La plateforme dédiée au partage de connaissances bucco-dentaires</li>
                    <li className="block1_text_list">Découvrez, partagez et commentez des cas cliniques</li>
                    <li className="block1_text_list">Participez aux discussions de la communauté</li>
                </ul>
                <div className='text-center'>
                    <h3>Dentiio sera bientôt disponible. Suivez-nous</h3>
                </div>
                <div className='text-center rsbloc'>
                    <a href='https://www.instagram.com/dentiio.fr/' target='_blank'><img className='rs' src={Insta}/></a>
                    <a href='https://www.facebook.com/dentiio/' target='_blank'><img className='rs' src={Fb}/></a>
                    <a href='https://www.linkedin.com/company/dentiio/' target='_blank'><img className='rs' src={In}/></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
