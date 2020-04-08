import React from 'react'
import './header.scss'

import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

import BlueButton from '../../UI/buttons/BlueButton'
import HomeButton from '../../UI/homeButton/HomeButton'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import WhiteButton from '../../UI/buttons/WhiteButton'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ToolBar from '@material-ui/core/Toolbar'

const Header = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      flexGrow: 1,
    },

  }));

  const user = useSelector(state => state.user);
  const classes = useStyles();
  let auth;
  let button;

  if (props.content === 'connexion') {
    auth = 'inscription'
    button = <WhiteButton content={auth}/>
  } else {
    auth = 'connexion'
    button = <BlueButton content={auth}/>
  }

  if (user !== '') {
    return <Redirect to="/account"/>
  }




  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeButton />
            </IconButton>

            <Typography className={classes.logo} >
              <TitleHeader/>
            </Typography>


            <Button color="inherit" >{button}</Button>
          </Toolbar>
        </AppBar>
      </div>
  );
  }


//     return (
//         <div className={classes.root}>
//           <AppBar position="static">
//             <ToolBar>
//               <HomeButton />
//               <div className='logoHorizontallyCenter'>
//                 <TitleHeader />
//               </div>
//               <Button color="inherit" >{button}</Button>
//             </ToolBar>
//           </AppBar>
//         </div>
//
//
//         // <div className='App'>
//         //   <header className='App-header'>
//         //     <HomeButton />
//         //     <TitleHeader />
//         //     {button}
//         //   </header>
//         // </div>
//
//
//     );
//   }
//

export default Header
