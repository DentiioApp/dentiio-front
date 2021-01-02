import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const GradientBtn = (props) => {
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #4cb3eb 30%, #9CDEF4 85%)',
      borderRadius: 20,
      border: 0,
      color: 'white',
      height: 52,
      width: 210,
      padding: '0 30px',
      display: 'flex',
      margin: 'auto',
      fontSize: '17px'
    },
    label: {
      textTransform: 'capitalize'
    }
  })
  const classes = useStyles()

  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label
      }}
      onClick={props.onClick}
    >
      {props.description}
    </Button>
  )
}

export default GradientBtn
