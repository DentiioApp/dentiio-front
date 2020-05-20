import React from 'react'

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Case from '../Case/case'
import titleSvg from '../../../images/maquette/c-case-title.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

const SlideCases = (props) => {
  const classes = useStyles();
  const oCases = props.content.slice(0, 3)
  
return (
    <>
      <Container maxWidth="lg">
        <center><img src={titleSvg} alt='Cas Cliniques' /></center>
        <div className={classes.root}>
          {
            oCases.map((oCase, index) => (
                <Case key={index} item={oCase} />
              )
            ) 
          }
        </div>
      </Container>
    </>
  )
}

export default SlideCases