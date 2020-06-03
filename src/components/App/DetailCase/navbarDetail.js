import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import './navbarDetail.scss'
//import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from "@material-ui/core/Button";
import { Link, animateScroll as scroll } from "react-scroll";

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
    },
    fixed: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: 10,
    }
}))

export const navbarDetail = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory()

    return (
            <AppBar position='static' wrap="nowrap"  color={"inherit"} className={classes.fixed}>
                <Toolbar>
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIcon color={"primary"}/>
                    </IconButton>
                    <div style={{ align: 'left' }}>
                        <Link to="examen"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                        >
                            <Button>
                                <span>Examen</span>
                            </Button>
                        </Link>
                        <Link to="diagnostic"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                        >
                            <Button>
                                <span>Diagnostic</span>
                            </Button>
                        </Link>
                        <Link to="plan"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                        >
                            <Button>
                                <span>Plan de traitement</span>
                            </Button>
                        </Link>
                        <Link to="evolution"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                        >
                            <Button>
                                <span>Evolution</span>
                            </Button>
                        </Link>
                        <Link to="conclusion"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}
                        >
                            <Button>
                                <span>Conclusion</span>
                            </Button>
                        </Link>
                        <Link to="discussion"
                              className={classes.detailnav}
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={500}>
                            <Button>
                                <span>Discussion</span>
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
    )
}

export default navbarDetail
