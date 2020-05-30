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
        textDecoration: 'none'
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
                        <Link to="#examen" className={classes.detailnav}>
                            <Button>
                                <span>Examen</span>
                            </Button>
                        </Link>
                        <Link to="#diagnostic" className={classes.detailnav}>
                            <Button>
                                <span>Diagnostic</span>
                            </Button>
                        </Link>
                        <Link to="#charge" className={classes.detailnav}>
                            <Button>
                                <span>Prise en charge</span>
                            </Button>
                        </Link>
                        <Link to="#result" className={classes.detailnav}>
                            <Button>
                                <span>Résultat</span>
                            </Button>
                        </Link>
                        <Link to="#discussion" className={classes.detailnav}>
                            <Button>
                                <span>Discussion</span>
                            </Button>
                        </Link>
                        <Link to="#conclusion" className={classes.detailnav}>
                            <Button>
                                <span>Conclusion</span>
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
    )
}

export default navbarDetail
