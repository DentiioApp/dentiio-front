import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import './gallery.css'
import Header from '../../components/App/Header/Header'
import NavbarDetail from '../../components/App/Cases/DetailCase/NavbarDetail'
import PatientDetail from '../../components/App/Cases/DetailCase/PatientDetail'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import iconTeethFull from '../../images/icon/iconTeethFull.svg'
import IconProfile from '../../components/UI/Icon/Profile/iconProfile'
import palette from '../../components/UI/ColorTheme/Palette'
import Keyword from '../../components/UI/buttons/Keywords/keywords'
import Gallery from '../../components/UI/Gallery/Gallery'
import CardPlanTreatment from '../../components/App/Cases/DetailCase/CardPlanTreatment'
import {getCaseById} from '../../services/Cases'
import {setup} from '../../services/Auth'
import RatingCase from "../../components/App/Cases/DetailCase/Rating";
import Spinner from "../../components/UI/Dawers/Spinner";
import Box from "@material-ui/core/Box";
import UserAvatar from "../../components/UI/Avatars/UserAvatar";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Comments from "../../components/App/Cases/Comments/Comments"

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

    const optionsDate = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const Img = item?.averageNote ? <img alt='' src={iconTeethFull} width='12px' className={classes.icon}/> : ''

    const imagesExam = (type) => {
        console.log(item)
        if (item.imgClinicalCaseOmnipratiques) {
            const array = []
            item.imgClinicalCaseOmnipratiques.filter(function (i) {
                return i.type === type
            }).map(function (img) {
                    return array.push({
                            original: process.env.REACT_APP_BACK_URL + "images/" + img.path,
                            thumbnail: process.env.REACT_APP_BACK_URL + "images/" + img.path
                        }
                    )
                }
            )
            return array
        }
    }
        
    if (setup()) {
        if (Object.entries(item).length === 0) {
            return (<><Header target=''/>
                <NavbarDetail/>
                <Spinner/></>)
        } else {
            return (
              <>
                <Box bgcolor="background.paper">
                  <Header target="" />
                  <NavbarDetail />
                  <div className={classes.root} id="presentation">
                    <Grid container spacing={1}>
                      <Grid container item md={3} spacing={1}>
                        <div className={classes.patientDesktop}>
                          <PatientDetail data={item?.Patient} />
                        </div>
                      </Grid>
                      <Grid container item md={7} spacing={1}>
                        <div className={classes.paddigTopTitle}>
                          <Typography component="h1" variant="h4">
                            {item?.title}
                          </Typography>
                          <Typography
                            component="p"
                            variant="body2"
                            className={classes.subtitle}
                          >
                            <span style={{ paddingRight: 20 }}>
                              {item.speciality?.map((spe) => spe.name + ", ")}
                            </span>
                            {Img}
                            {item?.averageNote}{" "}
                            {item.notations?.length
                              ? "(" + item.notations.length + "notes )"
                              : "Aucune note"}
                          </Typography>
                          <Typography
                            component="p"
                            variant="body2"
                            className={classes.subtitle}
                          >
                            Publié le{" "}
                            {item.createdAt &&
                              new Date(item.createdAt).toLocaleDateString(
                                "fr-FR",
                                optionsDate
                              )}
                            &nbsp;par&nbsp;
                            <span
                              className={classes.profileName}
                              style={{ textTransform: "capitalize" }}
                            >
                              {item.User?.pseudo}
                            </span>
                            <UserAvatar
                              avatar={item?.User?.avatar}
                              width="30px"
                            />
                          </Typography>
                          <Typography
                            component="h3"
                            variant="h5"
                            className={classes.h3}
                          >
                            Motif de consultation
                          </Typography>
                          <p>{item.Patient?.reasonConsult}</p>
                          {/*<Typography component='h3' variant='body1'>
                                            Les symptômes sont :
                                            {item.symptome?.map((keyword, index) => (
                                                <div key={index} className={classes.keywords}>
                                                    <Keyword key={index} keyword={keyword.name}/>
                                                </div>
                                            ))}
                                        </Typography>*/}
                          <div className={classes.patientMobile}>
                            <PatientDetail />
                          </div>
                          <Typography
                            component="h3"
                            variant="h5"
                            className={classes.h3}
                            id="examen"
                          >
                            Examen clinique
                          </Typography>
                          <p>{item?.ExamDescription}</p>
                          {item.imgClinicalCaseOmnipratiques &&
                            imagesExam("examen").length != 0 && (
                              <Gallery images={imagesExam("examen")} />
                            )}
                          <Typography
                            component="h3"
                            variant="h5"
                            className={classes.h3}
                            id="diagnostic"
                          >
                            Diagnostic
                          </Typography>
                          <p>{item?.pathologie}</p>
                          <Grid container item md={12} spacing={1}>
                            {/*{item.pathologie?.map((keyword, index) => (
                                                <div key={index} className={classes.keywords}>
                                                    <Keyword key={index} keyword={keyword.name}/>
                                                </div>
                                            ))}*/}
                          </Grid>
                          <Typography
                            component="h3"
                            variant="h5"
                            className={classes.h3}
                            id="plan"
                          >
                            Plan de traitement
                          </Typography>
                          <p>{item?.TreatmentDescription}</p>
                          <Grid
                            container
                            spacing={1}
                            className={classes.resume}
                          >
                            {item.imgClinicalCaseOmnipratiques &&
                              imagesExam("treatment").length != 0 && (
                                <Gallery images={imagesExam("treatment")} />
                              )}
                          </Grid>
                        </div>
                        <br />
                        <RatingCase />

                        <Typography
                          component="h3"
                          variant="h5"
                          className={classes.h3}
                          id="diagnostic"
                        >
                          Diagnostic
                        </Typography>
                        <p>{item.diagnostic && item.diagnostic}</p>

                        <Grid container item md={12} spacing={1}>
                          <div key={"ok"} className={classes.keywords}>
                            <Keyword key={"ind"} keyword={item.pathologie} />
                          </div>
                        </Grid>
                        <Typography
                          component="h3"
                          variant="h5"
                          className={classes.h3}
                          id="plan"
                        >
                          Plan de traitement
                        </Typography>
                        <p>{item.treatmentPlan && item.treatmentPlan}</p>
                        <Grid container spacing={1} className={classes.resume}>
                          {item.imageClinicalCases &&
                            imagesExam("plan-de-traitement").map(
                              (img, index) => (
                                <Grid
                                  container
                                  item
                                  md={6}
                                  key={index}
                                  justify="center"
                                >
                                  <CardPlanTreatment
                                    title={index + 1}
                                    key={index}
                                    description=""
                                    image={img.original}
                                  />
                                </Grid>
                              )
                            )}
                        </Grid>

                        <Typography
                          component="h3"
                          variant="h5"
                          className={classes.h3}
                          id="evolution"
                        >
                          Evolution
                        </Typography>
                        <p>{item.evolution && item.evolution}</p>
                        {/* {Evolution()} */}
                        <Typography
                          component="h3"
                          variant="h5"
                          className={classes.h3}
                          id="conclusion"
                        >
                          Conclusion
                        </Typography>
                        <p>{item.conclusion && item.conclusion}</p>
                        <RatingCase />
                        <Comments key={"commentsData"} datas={item} />

                        {/* <Grid container className={classes.alignRight} item md={2} spacing={1}>
                                    <div>
                                    </div>
                                </Grid> */}
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </>
            );
        }
    } else {
        return (<Redirect to='/'/>)
    }
}

export default DetailCase
