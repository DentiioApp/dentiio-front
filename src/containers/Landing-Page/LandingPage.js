import React from 'react'
import './LandingPage.scss'
import FacebookIcon from '../../images/Facebook.png';
import InstagramIcon from '../../images/Instagram.png';
import LinkedInIcon from '../../images/linkedin.png';
import GgformIcon from '../../images/ggform.png';
import Illus from '../../images/illus4.png'
import IllusOrdi from '../../images/illusordi.png'
import Logo from '../../images/logoblue.png'
import Knwoledge from '../../images/tooth.png'
import Diagnostic from '../../images/dentist.png'
import Community from '../../images/teamwork.png'


function LandingPage () {
  return (
    <div className='App'>
        <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"/>
        <div className='container'>
            <div className='item50'>
                <div className='pad3'>
                    <div className='align-logo'>
                        <img src={Logo} alt="logo dentiio" className='logo'/>
                    </div>
                    <div>
                        <h1 className='text-left title'>La référence du diagnostic pour les chirurgiens-dentistes</h1>
                        <p className='subtitle'>Découvrez, partagez et commentez des cas cliniques</p>
                    </div>
                    <div className='text-center rs-bloc'>
                        <h3 className='commingsoon'>Dentiio sera bientôt disponible.</h3>
                        <h3 className='commingsoon'>Suivez-nous!</h3>
                        <a href='https://www.facebook.com/dentiio/' target='_blank' rel="noopener noreferrer"><img alt='facebook icon' src={FacebookIcon} className='rs'/></a>
                        <a href='https://www.linkedin.com/company/dentiio/' target='_blank' rel="noopener noreferrer"><img alt='linkedin icon' src={LinkedInIcon} className='rs'/></a>
                        <a href='https://www.instagram.com/dentiio.fr/' target='_blank' rel="noopener noreferrer"><img alt='instagram icon' src={InstagramIcon} className='rs'/></a>
                    </div>
                </div>
            </div>
            <div className='item50 illusbloc'>
                <img className='illus' alt="illustration of dentists caring for a tooth" src={Illus}/>
            </div>
        </div>
        <div className='container bck-grey picto-bloc'>
            <div className='item33 text-center'>
                <h2 className='picto-title'>Validez votre diagnostic</h2>
                <img className='picto' alt="validate your diagnosis" src={Knwoledge}/>
                <p className='picto-dsc'>Coopérez avec d’autres praticiens pour vos prises de décisions à travers notre plateforme de discussion.</p>
            </div>
            <div className='item33 text-center'>
                <hr className='picto-hr'/>
                <h2 className='picto-title'>Ciblez la priorité: votre patient</h2>
                <img className='picto' alt="patient" src={Diagnostic}/>
                <p className='picto-dsc'>Choisissez la meilleure thérapeutique à adopter pour votre patient et diversifiez vos méthodes en consultant des cas cliniques réels et certifiés. </p>
            </div>
            <div className='item33 text-center'>
                <hr className='picto-hr'/>
                <h2 className='picto-title'>Devenez acteur de votre communauté</h2>
                <img className='picto' alt="community" src={Community}/>
                <p className='picto-dsc'>Démarquez vous en publiant vos cas, et faites parti d’une communauté d'échanges et d’entraide.</p>
            </div>
        </div>
        <div className='container'>
            <div className='item50 illusbloc'>
                <img className='illus' alt="Dentiio view desktop and mobile" src={IllusOrdi}/>
            </div>
            <div className='item50'>
                <div className='pad3'>
                    <div className='pad-l3 pad-t5'>
                        <h1 className='text-left title'>Prochainement accessible sur web & mobile</h1>
                        <p className='subtitle'>Dentiio vous accompagne pour être au plus proche de vos patients.</p>
                    </div>
                    <div className='text-left pad-l3 rs-bloc'>
                        <h3 className='quest '>Aidez-nous à répondre au mieux à vos besoins en répondant à notre questionnaire en cliquant sur l'icône si dessous</h3>
                    </div>
                    <div className='text-center'>
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfS_jq9N_vC1eYy48ZX8I3hqyO7R4be91k5Vi_2BUymXkM-eg/viewform?usp=sf_link' target='_blank' rel="noopener noreferrer"><img alt='google form icon' src={GgformIcon} className='ggform-icon'/></a>
                    </div>
                </div>
            </div>
        </div>
        <div className='container footer text-white pad-b3'>
            <div className='item33 pad-l3'>
                <h4 className='title-footer'>Contactez-nous</h4>
                <a className='text-white' href='mailto:contact@dentiio.com'>contact@dentiio.com</a>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
