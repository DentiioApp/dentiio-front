import React from 'react'
import { Redirect } from 'react-router-dom'
import CasesList from '../../components/App/CasesList/CasesList'
import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'
import Search from '../../components/App/Search/Search'

import SwipeableTemporaryDrawer from "../../components/App/SideBarMenu/sideBarMenu"

/* const useStyles = makeStyles((theme) => ({
  root: {
    height: 260,
  },
})); */

const Cases = () => {
  // const classes = useStyles();

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target="home" />
      <SwipeableTemporaryDrawer />
      {/* <Container className={classes.root} children={""} /> */}
      <Search />
      <CasesList />
    </>
  );
}

export default Cases
