import React from 'react'
import Header from '../../components/App/Header/header'
import NavbarDetail from "../../components/App/DetailCase/navbarDetail";
import PatientDetail from "../../components/App/DetailCase/patientDetail";
import Grid from "@material-ui/core/Grid";

const detailCase = (props) => {
    console.log(props.item)
    return (
        <>
            <Header target='' />
            <NavbarDetail/>
            <Grid container spacing={1}>
                <Grid container item md={3} spacing={1}>
                   <PatientDetail/>
                </Grid>
                <Grid container item md={6} spacing={1}>
                    <p>kjjhjjh</p>
                </Grid>
                <Grid container item  md={3} spacing={1}>
                    <p>kjjhjhh</p>
                </Grid>
            </Grid>
        </>
    )
}

export default detailCase