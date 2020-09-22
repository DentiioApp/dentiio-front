import React from 'react'
import './gallery.css'
import './detailCase.scss'
import Header from '../../components/App/Header/Header'
import NavbarDetail from '../../components/App/DetailCase/NavbarDetail'
import PatientDetail from '../../components/App/DetailCase/PatientDetail'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import iconTeethFull from '../../images/icon/iconTeethFull.svg'
import Button from '@material-ui/core/Button'
import IconProfile from '../../components/UI/Icon/Profile/iconProfile'
import ShareIcon from '@material-ui/icons/Share'
import palette from '../../components/UI/ColorTheme/Palette'
import Keyword from '../../components/UI/Keywords/keywords'
import Gallery from '../../components/UI/Gallery/Gallery'
import LightboxButton from '../../components/UI/Gallery/LightboxButton'
import CardPlanTreatment from '../../components/App/DetailCase/CardPlanTreatment'
import plan1 from '../../images/fixtures/plan1.jpg'
import plan2 from '../../images/fixtures/plan2.jpg'
import radio1 from '../../images/fixtures/radio.jpg'
import radio2 from '../../images/fixtures/radio2.jpg'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: palette.grey,
    fontSize: '0.8em',
    paddingTop: 10
  },
  h3: {
    color: palette.primary,
    borderColor: palette.primary,
    marginTop: 50,
    marginBottom: 20,
    padding: 5,
    borderBottom: '1px solid'
  },
  patientDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  patientMobile: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  paddigTopTitle: {
    paddingTop: '100px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '0'
    }
  }
}))

const imagesExamen = [
  {
    original: 'https://dr-demonchaux-thierry.chirurgiens-dentistes.fr/wp-content/uploads/Encombrement-anterieur-Avant-Cas-Clinique.jpg',
    thumbnail: 'https://dr-demonchaux-thierry.chirurgiens-dentistes.fr/wp-content/uploads/Encombrement-anterieur-Avant-Cas-Clinique.jpg'
  },
  {
    original: plan1,
    thumbnail: plan1
  },
  {
    original: plan2,
    thumbnail: plan2
  }
]

const imagesScanner = [
  {
    original: radio1,
    thumbnail: radio1
  },
  {
    original: radio2,
    thumbnail: radio2
  }
]

const detailCase = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()

  return (
    <>
      <Header target='' />
      <NavbarDetail />
      <div className='root'>
        <Grid container spacing={1}>
          <Grid container item md={3} spacing={1}>
            <div className={classes.patientDesktop}>
              <PatientDetail />
            </div>
          </Grid>
          <Grid container item md={7} spacing={1}>
            <div className={classes.paddigTopTitle}>
              <Typography component='h1' variant='h4'>
                            Traitement des racines internes
              </Typography>
              <Typography component='p' variant='body2' className={classes.subtitle}>
                <span style={{ paddingRight: 20 }}>Implotologie</span>
                <img alt='' src={iconTeethFull} width='12px' className="icon" />
                                    4,7 (32 notes)
              </Typography>
              <Typography component='p' variant='body2' className={classes.subtitle}>
                            Publié il y a 2 jours
              </Typography>

              <Grid container spacing={1} className="resume">
                <Grid container item md={3} spacing={1} justify='center'>
                  <div className="textCenter">
                    <IconProfile color={palette.primary} profile={props.profileId} img={props.profileImg} />
                    <p className="profileName">
                                        Nikita
                      <br />
                      <span className={classes.subtitle}>
                                          Implantologue
                      </span>
                    </p>
                  </div>
                </Grid>
                <Grid container item md={9} spacing={1}>
                  <p>
                    L’améloblastome est la tumeur odontogène la plus fréquente dans les pays en voie de développement et occupe la 2ème place après lves odontomes dans les pays développés. Elle a été classée cliniquement en 3 groupes par l’OMS en 2017. La prise en charge de l’améloblastome est compliquée par le taux de récidive important associé à un traitement conservateur.
                  </p>
                  <div className="keywords">
                    <Keyword keyword='Fumeur' />
                  </div>
                </Grid>
              </Grid>
              <Typography component='h3' variant='h5' className={classes.h3}>
                            Motif de consultation
              </Typography>
              <p>
                            Les dents infero-anterieur ont une légère mobilité et sont douloureuses depuis quelques jours.
              </p>
              <div className={classes.patientMobile}>
                <PatientDetail />
              </div>
              <Typography component='h3' variant='h5' className={classes.h3} id='examen'>
                            Examen clinique
              </Typography>
              <Gallery images={imagesExamen} />
              <p>
                            Les dents infero-anterieur ont une légère mobilité et sont douloureuses depuis quelques jours.
              </p>
              <Typography component='h3' variant='h5' className={classes.h3}>
                            Examen complementaire
              </Typography>
              {/* si il y a scanner */}
              <Typography component='h3' variant='h5' className="titleExam">
                            Scanner
              </Typography>
              <Gallery images={imagesScanner} />
              <p>
                            Scanner incroyable
              </p>
              {/* si il y a biopsy */}
              <Typography component='h3' variant='h5' className="titleExam">
                            Biopsy
              </Typography>
              <p>
                            La biopsy indique que nanani
              </p>
              <LightboxButton />
              <Typography component='h3' variant='h5' className={classes.h3} id='diagnostic'>
                            Diagnostic
              </Typography>
              <p>
                            Le diagnostic est nanananan
              </p>
              <Grid container item md={12} spacing={1}>
                <div className="keywords">
                  <Keyword keyword='Cancer' />
                </div>
              </Grid>
              <Typography component='h3' variant='h5' className={classes.h3} id='plan'>
                            Plan de traitement
              </Typography>
              <Grid container spacing={1} className="resume">
                <Grid container item md={6} justify='center'>
                  <CardPlanTreatment title='1. Extraction' description='On a enlevé la dent' image={plan1} />
                </Grid>
                <Grid container item md={6} justify='center'>
                  <CardPlanTreatment title='2. Polissage' description='On a polit la gencive' />
                </Grid>
                <Grid container item md={6} justify='center'>
                  <CardPlanTreatment
                    title='3. Fermer la plaie' description='On a fermé la plaie cisdlhcosidh vcsdivhsdvhsdivhsd vosdihvisdovhsdoiv hodivhsovhovhoduhvcosdhvcsdou chsdocuhsdvuhsfuhvsoduhvosu'
                    image='https://lh3.googleusercontent.com/proxy/5VeKp24sBihw8l_wMn2PKQj2tIvmFLrsotoUSJh0mZBtOEF5H0QRw4XteaTcWYkRsxzY0YWzP2ZQNGd7XiCuVv4yh_GozOK6BjULz3F-afBTBHRJvaAGws5Kr13j9mpmHvluBjI8LMPFOeY'
                  />
                </Grid>
              </Grid>

              <Typography component='h3' variant='h5' className={classes.h3} id='evolution'>
                            Evolution
              </Typography>
              <p>
                            Aprèe deux mois voila le resultat
              </p>
              <Gallery images={imagesExamen} />
              <Typography component='h3' variant='h5' className={classes.h3} id='conclusion'>
                            Conclusion
              </Typography>
              <p>
                            C'était super
              </p>
            </div>

          </Grid>
          <Grid container className="alignRight" item md={2} spacing={1}>
            <div>
              <Button
                href=''
                onClick={e => e.preventDefault()}
              >
                <ShareIcon /> Partager
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default detailCase
