import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'
import {
    Typography,
} from '@material-ui/core/'



const CGU = () => {
    const history = useHistory()
    return(
        <>
        <IconButton href={'#'} onClick={() => history.goBack()} >
            <ArrowBackIcon />
        </IconButton>
            <Typography >
                Conditions générales d'utilisation
            </Typography>
        </>
    )
}

export default CGU