import React from 'react'
import Header from '../../components/App/Header/header'
import NavbarDetail from "../../components/App/DetailCase/navbarDetail";
import PatientDetail from "../../components/App/DetailCase/patientDetail";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        margin: 30
    },
    alignRight: {
        textAlign: 'right'
    }
});

const detailCase = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    return (
        <>
            <Header target='' />
            <NavbarDetail/>
            <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item md={3} spacing={1}>
                   <PatientDetail/>
                </Grid>
                <Grid container item md={6} spacing={1}>
                    <Typography variant="h4" component="h1">
                        Traitement des racines internes
                    </Typography>
                    <Typography variant="p" component="p">
                        Implantologie
                    </Typography>
                </Grid>
                <Grid container className={classes.alignRight} item  md={3} spacing={1}>
                    <p>Partager</p>
                </Grid>
            </Grid>
            </div>
        </>
    )
}

export default detailCase