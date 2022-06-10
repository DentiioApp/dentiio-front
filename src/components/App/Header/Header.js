import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import palette from '../../UI/ColorTheme/Palette'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import TitleHeaderMobile from '../../UI/titleHeader/titleHeaderMobile'
import AddIcon from '../../UI/Icon/Header/Add'
import HomeIcon from '../../UI/Icon/Header/home'
// import FavoritesIcon from '../../UI/Icon/Header/favorites'
// import NotificationIcon from '../../UI/Icon/Header/notification'
import RightMenuIcon from '../../UI/RightMenuIcon/rightMenuIcon'
import UserAvatar from '../../UI/Avatars/UserAvatar'
import Button from "@material-ui/core/Button";

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
  const currents_user = useSelector((state) => (state.user.current_user))

  return (
    <div className={classes.grow}>

      <AppBar
        position='static'
        color='primary'
      >
        <Toolbar>
          <TitleHeader style={{ align: 'center' }} />
          <RightMenuIcon target={props.target} avatar={currents_user?.avatar} />
        </Toolbar>
      </AppBar>

      {/* Mobile header */}
      <AppBar
        position='static'
        className={classes.sectionMobileTop}
        color='inherit'
      >
        <Toolbar>
          <TitleHeaderMobile style={{ align: 'center' }} />
          <div className={classes.grow} style={{ align: 'right' }} />
          {/*<div>
            <NotificationIcon color={palette.primary} />
          </div>*/}
          <div>
            <a href={"https://docs.google.com/forms/d/e/1FAIpQLSfgi6WlyYhqpOgG46G4iEUeTobpS_52J4mKvCZbSZr-FM0FnA/viewform"} target={"_blank"}
            style={{textDecoration: "none"}} rel="noreferrer">
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
            >
              Donnez votre avis
            </Button>
            </a>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar className={classes.sectionMobileBottom} color='inherit'>
        <Toolbar>
          <Link to='/cases'>
            <HomeIcon target={props.target} color={palette.primary} />
          </Link>
          <div className={classes.grow} style={{ align: 'right' }} />
          <AddIcon color={palette.primary} />
          {/*<div className={classes.grow} style={{ align: 'right' }} />
          <Link to='/favorites'>
            <FavoritesIcon target={props.target} color={palette.primary} />
          </Link>*/}
          <div className={classes.grow} style={{ align: 'right' }} />
          <Link to='/profile'>
            <UserAvatar width={'40px'} avatar={currents_user?.avatar} />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
