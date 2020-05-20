import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { blue } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import fav from '../../../images/maquette/fav.svg'

import { avgNotes } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    border: 'solid 1px #90caf9'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: blue[200]
  }

}))

const Case = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <img Style='float:right' src={fav} alt='favorite' />
      <CardMedia
        className={classes.media}
        image='https://upload.wikimedia.org/wikipedia/commons/1/17/Yin_yang.svg'
        title='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {props.item.presentation}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Avatar aria-label='recipe' className={classes.avatar}>
          {'Av'}
        </Avatar>
        <small>{'pseudo'} </small>
        <small>  {'function'}</small>
        {/* <TeethButton> */}

        {/* </TeethButton> */}
        {/* <CommentButton aria-label="comments"> */}
           coms: {props.item.commentaires.length}
        {/* </CommentButton> */}
        {/* <NoteButton aria-label="comments"> */}
           notes: {avgNotes(props.item.notations)}
        {/* </NoteButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit key={1}>
        <CardContent>
          <Typography paragraph>Presentation:</Typography>
          <Typography paragraph>{props.item.observation}</Typography>
          <Typography paragraph>Observation:</Typography>
          <Typography paragraph>{props.item.observation}</Typography>
          <Typography paragraph>Plan de traitement:</Typography>
          <Typography paragraph>{props.item.treatmentPlan}</Typography>
          <Typography paragraph color='blue'>Evolution:</Typography>
          <Typography paragraph>{props.item.evolution}</Typography>
          <Typography>
            {props.item.conclusion}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Case
