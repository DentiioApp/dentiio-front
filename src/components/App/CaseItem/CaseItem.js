import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { blue } from '@material-ui/core/colors'

import fav from '../../../images/maquette/fav.svg'
import { ADD_FAVORITE, addFav } from '../../../store/actions'
import { avgNotes } from '../../../utils'
import { useToasts } from 'react-toast-notifications'

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
  },
  flright: {
    float: 'right'
  }

}))

const CasesItem = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { config } = useSelector((state) => state.home)
  const iUser = useSelector((state) => state.user.id)
  const { addToast } = useToasts()

  const messages = config.conf.messages.cases.favorite

  const HandleFav = async (iItem) => {
    // chek item integrity
    const response = await addFav(iUser, iItem)
    const regex2 = RegExp(/Error/)

    if (regex2.test(response)) {
      addToast(messages.add.error, { appearance: 'error' })
    } else {
      dispatch({ type: ADD_FAVORITE, data: iItem })

      addToast(messages.add.success, { appearance: 'success' })
    }
  }

  return (

    <Card className={classes.root}>
      <img className={classes.flright} src={fav} alt='favorite' onClick={(e) => (HandleFav(props.item.id))} />
      <Link to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
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
      </Link>
    </Card>
  )
}

export default CasesItem
