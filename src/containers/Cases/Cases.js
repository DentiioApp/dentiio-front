import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Redirect } from "react-router-dom";
import CasesList from "../../components/App/CasesList/CasesList";
import Header from "../../components/App/Header/Header";
import Search from "../../components/App/Search/Search";
import { setup } from "../../services/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 260,
  },
}));

const Cases = () => {
  const classes = useStyles();

  if (setup() === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header target="home" />
      {/* <Container className={classes.root} /> */}

      <Search />

      <CasesList />
    </>
  );
};

export default Cases;
