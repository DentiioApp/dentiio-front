import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import palette from '../ColorTheme/Palette'
import AddIcon from '../Icon/Header/Add'
import FavoritesIcon from '../Icon/Header/favorites'
import HomeIcon from '../Icon/Header/home'
import NotificationIcon from '../Icon/Header/notification'
import ProfileIcon from '../Icon/Header/profile'

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
  }
}))

export const RightMenuIcon = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.right}>
      <div className={classes.grow} style={{ align: 'right' }} />
      <div style={{ align: 'right' }}>
        <Link to='/cases'>
          <HomeIcon target={props.target} color={palette.white} />
        </Link>
        <Link to='/favorites'>
          <FavoritesIcon target={props.target} color={palette.white} />
        </Link>
        <NotificationIcon color={palette.white} />
        <Link to='/profile'>
          <ProfileIcon target={props.target} color={palette.white} />
        </Link>
        <AddIcon color={palette.white} />
      </div>
    </div>
  )
}

export default RightMenuIcon
