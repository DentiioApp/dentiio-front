import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import './navbarDetail.scss'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    sectionDesktop: {
        display: 'flex',
            [theme.breakpoints.up('sm')]: {
            display: 'flex',
            },
    },
    detailnav:{
        textdecoration: 'none'
    }
}))

export const navbarDetail = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory()

    return (
            <AppBar position='static' wrap="nowrap"  color={"inherit"}>
                <Toolbar>
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIcon color={"primary"}/>
                    </IconButton>
                    <div style={{ align: 'left' }}>
                        <Link to="#examen">
                            <Button className={classes.detailnav}>
                                <span className={classes.detailnav}>Examen</span>
                            </Button>
                        </Link>
                        <Link to="#diagnostic">
                            <Button className={classes.detailnav}>
                                <span>Diagnostic</span>
                            </Button>
                        </Link>
                        <Link to="#charge">
                            <Button className={classes.detailnav}>
                                <span>Prise en charge</span>
                            </Button>
                        </Link>
                        <Link to="#result">
                            <Button className={classes.detailnav}>
                                <span>Résultat</span>
                            </Button>
                        </Link>
                        <Link to="#discussion">
                            <Button className={classes.detailnav}>
                                <span>Discussion</span>
                            </Button>
                        </Link>
                        <Link to="#conclusion">
                            <Button className={classes.detailnav}>
                                <span>Conclusion</span>
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
    )
}

export default navbarDetail
