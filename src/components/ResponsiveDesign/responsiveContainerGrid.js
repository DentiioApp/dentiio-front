import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import ResponsiveConstants from '../../components/ResponsiveDesign/responsiveConstants'

const styleSheet = theme => ({
  root: {
    [theme.breakpoints.up(ResponsiveConstants.mobileBreakpoint)]: {
      'min-height': 600
    }
  }
})

function ResponsiveContainerGrid ({ classes, children }) {
  return (
    <Grid
      className={classes.root}
      container
      direction='row'
      justify='center'
      align='center'
    >
      {children}
    </Grid>
  )
}

export default withStyles(styleSheet)(ResponsiveContainerGrid)
