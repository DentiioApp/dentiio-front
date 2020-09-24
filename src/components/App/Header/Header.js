import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import palette from '../../UI/ColorTheme/Palette'
import { Link, Redirect } from 'react-router-dom'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import TitleHeaderMobile from '../../UI/titleHeader/titleHeaderMobile'

import { setup } from '../../../services/Auth'
import HomeIcon from '../../UI/Icon/Header/home'
import FavoritesIcon from '../../UI/Icon/Header/favorites'
import NotificationIcon from '../../UI/Icon/Header/notification'
import ProfileIcon from '../../UI/Icon/Header/profile'
import AddIcon from '../../UI/Icon/Header/add'
import RightMenuIcon from "../../UI/RightMenuIcon/rightMenuIcon";
import AddIcon from '../../UI/Icon/Header/Add'

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
      display: 'flex',
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
  }
}))

export const Header = (props) => {
  const classes = useStyles()

  if (setup() === false) {
    return <Redirect to='/' />
  };

  return (
    <div className={classes.grow}>
      
      <AppBar
        position="static"
        className={classes.sectionDesktop}
        color="primary"
      >
        <Toolbar>
          <TitleHeader style={{ align: "center" }} />
          <RightMenuIcon />
        </Toolbar>
      </AppBar>

      {/* Mobile header */}
      <AppBar
        position="static"
        className={classes.sectionMobileTop}
        color="inherit"
      >
        <Toolbar>
          <TitleHeaderMobile style={{ align: "center" }} />
          <div className={classes.grow} style={{ align: "right" }} />
          <div>
            <NotificationIcon color={palette.primary} />
          </div>
        </Toolbar>
      </AppBar>
      <AppBar className={classes.sectionMobileBottom} color="inherit">
        <Toolbar>
          <AddIcon color={palette.primary} />
          <div className={classes.grow} style={{ align: "right" }} />
          <Link to="/cases">
            <HomeIcon target={props.target} color={palette.primary} />
          </Link>
          <div className={classes.grow} style={{ align: "right" }} />
          <Link to="/favorites">
            <FavoritesIcon target={props.target} color={palette.primary} />
          </Link>
          <div className={classes.grow} style={{ align: "right" }} />
          <Link to="/profile">
            <ProfileIcon target={props.target} color={palette.primary} />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
