import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
// import CardHeader from '@material-ui/core/CardHeader';
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
    border: 'solid 1px #90caf9',
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
  },
  flright: {
    float: 'right'
  },

}))

const Case = (props) => {
  const classes = useStyles()
  console.log(props.item)
  return (
    <Link to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <img className={classes.flright} src={fav} alt='favorite' />
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
        </CardActions>
      </Card>
    </Link>
  )
}

export default Case
