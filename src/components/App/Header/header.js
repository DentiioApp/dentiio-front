import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import palette from '../../UI/colorTheme/palette'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import TitleHeaderMobile from '../../UI/titleHeader/titleHeaderMobile'
import { Redirect } from 'react-router-dom'
import { setup } from '../../../services/Auth'
import HomeIcon from '../../Icon/Header/home'
import FavoritesIcon from '../../Icon/Header/favorites'
import NotificationIcon from '../../Icon/Header/notification'
import ProfileIcon from '../../Icon/Header/profile'

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
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
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))

export const Header = (props) => {
  const classes = useStyles()

  if (setup() === false) {
    return <Redirect to='/' />
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.sectionDesktop} color='primary'>
        <Toolbar>
          <TitleHeader style={{ align: 'center' }} />
          <div className={classes.grow} style={{ align: 'right' }} />
          <div style={{ align: 'right' }}>
            <HomeIcon target={props.target} color={palette.white} />
            <FavoritesIcon target={props.target} color={palette.white} />
            <NotificationIcon color={palette.white} />
            <ProfileIcon target={props.target} color={palette.white} />
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position='static' className={classes.sectionMobileTop} color='inherit'>
        <Toolbar>
          <TitleHeaderMobile style={{ align: 'center' }} />
          <div className={classes.grow} style={{ align: 'right' }} />
          <div>
            <NotificationIcon color={palette.primary} />
          </div>
        </Toolbar>
      </AppBar>
      <AppBar className={classes.sectionMobileBottom} color='inherit'>
        <Toolbar>
          <HomeIcon target={props.target} color={palette.primary} />
          <div className={classes.grow} style={{ align: 'right' }} />
          <FavoritesIcon target={props.target} color={palette.primary} />
          <div className={classes.grow} style={{ align: 'right' }} />
          <ProfileIcon target={props.target} color={palette.primary} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
