import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import empty from '../../../images/empty.png'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  media: {
    height: 200
  }
})

export default function CardPlanTreatment (props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()

  const Media = (props) => {
    if (props.image.image !== undefined) {
      return (
        <CardMedia
          className={classes.media}
          image={props.image.image}
          title={props.image.title}
        />
      )
    }
    return (
      <CardMedia
        className={classes.media}
        image={empty}
        title='Image manquante'
      />
    )
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Media image={props} />
        <CardContent>
          <Typography gutterBottom variant='h6' component='h5'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
