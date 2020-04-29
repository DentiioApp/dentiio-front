import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import ResponsiveConstants from '../../components/ResponsiveDesign/responsiveConstants'

const styleSheet = theme => ({
  root: {
    [theme.breakpoints.down(ResponsiveConstants.mobileBreakpoint)]: {
      boxShadow: theme.shadows[0]
    },
    [theme.breakpoints.up(ResponsiveConstants.mobileBreakpoint)]: {
      width: 450,
      boxShadow: theme.shadows[2]
    }
    // height: '100%'
  }
})

function ResponsiveCard ({ classes, children }) {
  return <Card className={classes.root}>{children}</Card>
}

export default withStyles(styleSheet)(ResponsiveCard)
