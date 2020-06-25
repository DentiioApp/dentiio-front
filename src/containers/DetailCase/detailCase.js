import React from 'react'
import "./gallery.css";
import Header from '../../components/App/Header/header'
import NavbarDetail from "../../components/App/DetailCase/navbarDetail";
import PatientDetail from "../../components/App/DetailCase/patientDetail";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import iconTeethFull from "../../images/icon/iconTeethFull.svg"
import Button from "@material-ui/core/Button";
import IconProfile from "../../components/UI/Icon/Profile/iconProfile";
import ShareIcon from '@material-ui/icons/Share';
import palette from "../../components/UI/colorTheme/palette";
import Keyword from "../../components/UI/Keywords/keywords";
import Gallery from "../../components/UI/Gallery/gallery";
import LightboxButton from "../../components/UI/Gallery/lightboxButton";

const useStyles = makeStyles({
    root: {
        margin: 30
    },
    alignRight: {
        textAlign: 'right'
    },
    subtitle:{
        fontSize: "0.8em",
        color: palette.grey,
        paddingTop: 10,
    },
    icon: {
        paddingRight: 10,
        marginTop: 2,
    },
    resume: {
        paddingTop: 20,
    },
    profileName:{
        textAlign: "center",
        margin: 0
    },
    textCenter:{
        textAlign: "center",
    },
    keywords:{
        margin: "0 2px",
    },
    h3:{
        marginTop: "50px",
        marginBottom: "20px",
        padding: "5px",
        color: palette.primary,
        borderBottom: "1px solid",
        borderColor: palette.primary
    },
    fixed:{
        position: "fixed"
    },
    titleExam:{
        margin: "30px 0 15px 0",
    }
});

const detailCase = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    return (
        <>
            <Header target='' />
            <NavbarDetail/>
            <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item md={3} spacing={1}>
                    <div>
                     <PatientDetail/>
                    </div>
                </Grid>
                <Grid container item md={7} spacing={1}>
                    <div>
                        <Typography component={"h1"} variant={"h4"}>
                            Traitement des racines internes
                        </Typography>
                        <Typography component={"p"} variant={"body2"} className={classes.subtitle}>
                            <span style={{paddingRight: 20}}>Implotologie</span>
                                    <img src={iconTeethFull} width={"12px"} className={classes.icon}/>
                                    4,7 (32 notes)
                        </Typography>
                        <Typography component={"p"} variant={"body2"} className={classes.subtitle}>
                            Publié il y a 2 jours
                        </Typography>

                        <Grid container spacing={1} className={classes.resume}>
                            <Grid container item md={3} spacing={1} justify="center">
                                <div className={classes.textCenter}>
                                    <IconProfile color={palette.primary} />
                                    <p className={classes.profileName}>
                                        Nikita
                                        <br/>
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
                                <div className={classes.keywords}>
                                <Keyword keyword={"Fumeur"} />
                                </div>
                                <div className={classes.keywords}>
                                <Keyword keyword={"Racines internes"} />
                                </div>
                                <div className={classes.keywords}>
                                <Keyword keyword={"Pollen"} />
                                </div>
                            </Grid>
                        </Grid>
                        <Typography component={"h3"} variant={"h5"} className={classes.h3}>
                            Motif de consultation
                        </Typography>
                        <p>
                            Les dents infero-anterieur ont une légère mobilité et sont douloureuses depuis quelques jours.
                        </p>

                        <Typography component={"h3"} variant={"h5"} className={classes.h3} id={"examen"}>
                            Examen clinique
                        </Typography>
                        <Gallery images="/*item.images*/"/>
                        <p>
                            Les dents infero-anterieur ont une légère mobilité et sont douloureuses depuis quelques jours.
                        </p>
                        <Typography component={"h3"} variant={"h5"} className={classes.h3}>
                            Examen complementaire
                        </Typography>
                        {/*si il y a scanner*/}
                        <Typography component={"h3"} variant={"h5"} className={classes.titleExam} >
                            Scanner
                        </Typography>
                        <Gallery images="/*item.images*/"/>
                        <p>
                            Scanner incroyable
                        </p>
                        {/*si il y a biopsy*/}
                        <Typography component={"h3"} variant={"h5"} className={classes.titleExam}>
                            Biopsy
                        </Typography>
                        <p>
                            La biopsy indique que nanani
                        </p>
                        <LightboxButton/>
                        <Typography component={"h3"} variant={"h5"} className={classes.h3} id={"diagnostic"}>
                            Diagnostic
                        </Typography>
                        <p>
                            Le diagnostic est nanananan
                        </p>
                        <Typography component={"h4"} variant={"h5"} className={classes.titleExam}>
                            Pathologie
                        </Typography>
                        <ul>
                            <li>
                                Carie
                            </li>
                        </ul>
                        <Typography component={"h3"} variant={"h5"} className={classes.h3} id={"plan"}>
                            Plan de traitement
                        </Typography>
                        <Typography component={"h3"} variant={"h5"} className={classes.h3} id={"evolution"}>
                            Evolution
                        </Typography>
                    </div>
                </Grid>
                <Grid container className={classes.alignRight} item  md={2} spacing={1}>
                    <div>
                        <Button
                            href=""
                            onClick={e => e.preventDefault()}
                        >
                            <ShareIcon/> Partager
                        </Button>
                    </div>
                </Grid>
            </Grid>
            </div>
        </>
    )
}

export default detailCase