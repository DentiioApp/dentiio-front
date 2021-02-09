import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import palette from '../ColorTheme/Palette'
import AddIcon from '../Icon/Header/Add'
import FavoritesIcon from '../Icon/Header/favorites'
import HomeIcon from '../Icon/Header/home'
import NotificationIcon from '../Icon/Header/notification'
import UserAvatar from '../Avatars/UserAvatar'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  sectionMobileTop: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    zIndex: 11,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  sectionMobileBottom: {
    display: 'flex',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    height: 50,
    zIndex: 11,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  right: {
    position: 'absolute',
    right: '0'
  },
  avatar: {
    paddingTop: '50px!important'
  },
  desktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))

export const RightMenuIcon = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.right}>
      <div className={classes.grow} style={{ align: 'right' }} />
      <div style={{ align: 'right' }}>
        <a href={"https://docs.google.com/forms/d/e/1FAIpQLSfgi6WlyYhqpOgG46G4iEUeTobpS_52J4mKvCZbSZr-FM0FnA/viewform"} target={"_blank"}
           style={{textDecoration: "none", paddingRight: "20px"}}>
          <Button
              variant="contained"
              color="secondary"
              size="medium"
              className={classes.desktop}
              startIcon={<AssignmentLateIcon />}
          >
            Donnez votre avis
          </Button>
        </a>
        <Link to='/cases'
              className={classes.desktop}
        >
          <HomeIcon target={props.target} color={palette.white} />
        </Link>
        <Link to='/favorites'>
          <FavoritesIcon target={props.target} color={palette.white} />
        </Link>
        {/*        <NotificationIcon color={palette.white} />*/}
        <AddIcon color={palette.white}
                 className={classes.desktop}
        />
        <Link to='/profile'>
          <Button>
            <UserAvatar className={classes.desktop} width={'45px'} avatar={props.avatar} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RightMenuIcon
