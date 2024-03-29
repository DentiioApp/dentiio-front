import './cgu.css'
import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'
import {
    Typography,
} from '@material-ui/core/'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from "@material-ui/core/Box";



const CGU = () => {
    const history = useHistory()
    return(
        <>
            <Box bgcolor="background.paper">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => history.goBack()} color="inherit" aria-label="menu">
                            <ArrowBackIcon className="white" />
                        </IconButton>
                        <Typography variant="h6" className="titleCgu" >
                            Conditions générales d'utilisation
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default CGU