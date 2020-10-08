import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import './gallery.css'
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
import { getCaseById } from '../../services/Cases'
import { setup } from '../../services/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '30px 10px 50px 10px',
    border: 'none'
  },
  alignRight: {
    textAlign: 'right'
  },
  subtitle: {
    color: palette.grey,
    paddingTop: 10
  },
  icon: {
    paddingRight: 10,
    marginTop: 2
  },
  resume: {
    paddingTop: 20
  },
  profileName: {
    textAlign: 'center',
    margin: 0
  },
  textCenter: {
    textAlign: 'center'
  },
  keywords: {
    margin: '0 2px'
  },
  h3: {
    marginTop: '50px',
    marginBottom: '20px',
    padding: '5px',
    color: palette.primary,
    borderBottom: '1px solid',
    borderColor: palette.primary
  },
  fixed: {
    position: 'fixed'
  },
  titleExam: {
    margin: '30px 0 15px 0'
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

const DetailCase = (props) => {
  const classes = useStyles()
  const [item, setItem] = useState({})

  const ResponseCase = async () => {
    const CaseById = await getCaseById(props.match.params.id)
    setItem(CaseById.datas)
  }

  useEffect(() => {
    if (Object.entries(item).length === 0) {
      ResponseCase()
    }
  })

  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const Img = item.averageNote ? <img alt='' src={iconTeethFull} width='12px' className={classes.icon} /> : ''

  const imagesExamFirst = (type) => {
    if (item.imageClinicalCases) {
      const array = []
      item.imageClinicalCases.filter(function (i) {
        return i.type.name === type
      }).map(function (img) {
        return array.push({
          original: 'https://api.dentiio.fr/images/' + img.path,
          thumbnail: 'https://api.dentiio.fr/images/' + img.path
        }
        )
      }
      )
      item.imageClinicalCases.filter(function (i) {
        return i.type.name === 'principal'
      }).map(function (img) {
        return array.push({
          original: 'https://api.dentiio.fr/images/' + img.path,
          thumbnail: 'https://api.dentiio.fr/images/' + img.path
        }
        )
      }
      )
      return array
    }
  }

  const imagesExam = (type) => {
    if (item.imageClinicalCases) {
      const array = []
      item.imageClinicalCases.filter(function (i) {
        return i.type.name === type
      }).map(function (img) {
        return array.push({
          original: 'https://api.dentiio.fr/images/' + img.path,
          thumbnail: 'https://api.dentiio.fr/images/' + img.path
        }
        )
      }
      )
      return array
    }
  }

  const imagesBiopsy = (type) => {
    if (item.imageClinicalCases) {
      const array = []
      item.imageClinicalCases.filter(function (i) {
        return i.type.name === type
      }).map(function (img) {
        return array.push('https://api.dentiio.fr/images/' + img.path
        )
      }
      )
      return array
    }
  }
  const Scanner = () => {
    if (imagesExam('scanner')) {
      if (imagesExam('scanner').length !== 0) {
        return (
          <>
            <Typography component='h3' variant='h5' className={classes.titleExam}>
                Scanner
            </Typography>
            <Gallery images={imagesExam('scanner')} />
            <p>
              {item.scanner && item.scanner}
            </p>
          </>
        )
      }
    }
  }

  const Evolution = () => {
    if (imagesExam('evolution')) {
      if (imagesExam('evolution').length !== 0) {
        return (
          <>
            <Gallery images={imagesExam('evolution')} />
          </>
        )
      }
    }
  }

  const Biopsy = () => {
    if (imagesExam('biopsy')) {
      if (imagesExam('biopsy').length !== 0) {
        return (
          <>
            <Typography component='h3' variant='h5' className={classes.titleExam}>
                Biopsy
            </Typography>
            <p>
              {item.biopsy && item.biopsy}
            </p>
            <LightboxButton images={imagesBiopsy('biopsy')} />
          </>
        )
      }
    }
  }

  if (setup()){
  return (
    <>
      <Header target='' />
      <NavbarDetail />
      <div className={classes.root} id='presentation'>
        <Grid container spacing={1}>
          <Grid container item md={3} spacing={1}>
            <div className={classes.patientDesktop}>
              <PatientDetail data={item.Patient && item.Patient} />
            </div>
          </Grid>
          <Grid container item md={7} spacing={1}>
            <div className={classes.paddigTopTitle}>
              <Typography component='h1' variant='h4'>
                {item.title && item.title}
              </Typography>
              <Typography component='p' variant='body2' className={classes.subtitle}>
                <span style={{ paddingRight: 20 }}>
                  {item.speciality && item.speciality.map((spe) => (
                    spe.name + ', '
                  ))}
                </span>
                {Img}
                {item.averageNote && item.averageNote} ({item.notations && item.notations.length} notes)
              </Typography>
              <Typography component='p' variant='body2' className={classes.subtitle}>
                            Publié le {item.createdAt && new Date(item.createdAt).toLocaleDateString('fr-FR', optionsDate)}
              </Typography>

              <Grid container spacing={1} className={classes.resume}>
                <Grid container item md={3} spacing={1} justify='center'>
                  <div className={classes.textCenter}>
                    <IconProfile color={palette.primary} profile={props.profileId} img={props.profileImg} />
                    <p className={classes.profileName} style={{ textTransform: 'capitalize' }}>
                      {item.user && item.user.pseudo}
                      <br />
                      <span className={classes.subtitle}>
                        {item.user && item.user.job.name}
                      </span>
                    </p>
                  </div>
                </Grid>
                <Grid container item md={9} spacing={1}>
                  <p>
                    {item.presentation && item.presentation}
                  </p>
                  {item.keyword && item.keyword.map((keyword, index) => (
                    <div key={index} className={classes.keywords}>
                      <Keyword key={index} keyword={keyword.name} />
                    </div>
                  ))}
                </Grid>
              </Grid>
              <Typography component='h3' variant='h5' className={classes.h3}>
                            Motif de consultation
              </Typography>
              <p>
                {item.reason_consult && item.reason_consult}
                            Les dents infero-anterieur ont une légère mobilité et sont douloureuses depuis quelques jours.
              </p>
              <Typography component='h3' variant='body1'>
                  Les symptômes sont :
                {item.symptome && item.symptome.map((keyword, index) => (
                  <div key={index} className={classes.keywords}>
                    <Keyword key={index} keyword={keyword.name} />
                  </div>
                ))}
              </Typography>
              <div className={classes.patientMobile}>
                <PatientDetail />
              </div>
              <Typography component='h3' variant='h5' className={classes.h3} id='examen'>
                            Examen clinique
              </Typography>
              {item.imageClinicalCases && <Gallery images={imagesExamFirst('examen')} />}
              <p>
                {item.observation && item.observation}
              </p>
              <Typography component='h3' variant='h5' className={classes.h3}>
                            Examen complementaire
              </Typography>
              {/* si il y a scanner */}
              {Scanner()}

              {/* si il y a biopsy */}
              {Biopsy()}

              <Typography component='h3' variant='h5' className={classes.h3} id='diagnostic'>
                            Diagnostic
              </Typography>
              <p>
                {item.diagnostic && item.diagnostic}
              </p>
              <Grid container item md={12} spacing={1}>
                {item.pathologie && item.pathologie.map((keyword, index) => (
                  <div key={index} className={classes.keywords}>
                    <Keyword key={index} keyword={keyword.name} />
                  </div>
                ))}
              </Grid>
              <Typography component='h3' variant='h5' className={classes.h3} id='plan'>
                            Plan de traitement
              </Typography>
              <p>
                {item.treatmentPlan && item.treatmentPlan}
              </p>
              <Grid container spacing={1} className={classes.resume}>
                {item.imageClinicalCases && imagesExam('plan-de-traitement').map((img, index) => (
                  <Grid container item md={6} key={index} justify='center'>
                    <CardPlanTreatment title={index + 1} key={index} description='' image={img.original} />
                  </Grid>
                ))}

              </Grid>

              <Typography component='h3' variant='h5' className={classes.h3} id='evolution'>
                Evolution
              </Typography>
              <p>
                {item.evolution && item.evolution}
              </p>
              {Evolution()}
              <Typography component='h3' variant='h5' className={classes.h3} id='conclusion'>
                            Conclusion
              </Typography>
              <p>
                {item.conclusion && item.conclusion}
              </p>
            </div>

          </Grid>
          <Grid container className={classes.alignRight} item md={2} spacing={1}>
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
  } else {
    return (<Redirect to="/" />)
  }
}

export default DetailCase
