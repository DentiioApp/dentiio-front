import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import './navbarDetail.scss'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import { Link } from 'react-scroll'
import { HashLink } from "react-router-hash-link";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 10
    }
  },
  sectionMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  detailnav: {
    textDecoration: 'none'
  }
}))

const NavbarDetail = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <AppBar
        position="static"
        wrap="nowrap"
        color="inherit"
        className={classes.sectionDesktop}
      >
        <Toolbar>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <div style={{ align: "left" }}>
            <HashLink
              to="#presentation"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Presentation</span>
              </Button>
            </HashLink>
            <HashLink
              to="#examen"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Examen</span>
              </Button>
            </HashLink>
            <HashLink
              to="#diagnostic"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Diagnostic</span>
              </Button>
            </HashLink>
            <HashLink
              to="#plan"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Plan de traitement</span>
              </Button>
            </HashLink>
            <HashLink
              to="#discussion"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Discussion</span>
              </Button>
            </HashLink>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.sectionMobile} id="sectionMobile">
        <div className="scrolling-wrapper">
          <div className="card">
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Link
              to="presentation"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              <Button>
                <span>Presentation</span>
              </Button>
            </Link>
            <Link
              to="examen"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Examen</span>
              </Button>
            </Link>
          </div>
            <Link
              to="diagnostic"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Diagnostic</span>
              </Button>
            </Link>
            <Link
              to="plan"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Plan de traitement</span>
              </Button>
            </Link>
            <Link
              to="evolution"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Evolution</span>
              </Button>
            </Link>
            <Link
              to="conclusion"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Conclusion</span>
              </Button>
            </Link>
            <Link
              to="discussion"
              className={classes.detailnav}
              activeClass="active"
              spy
              smooth
              offset={-100}
              duration={500}
            >
              <Button>
                <span>Discussion</span>
              </Button>
            </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarDetail
