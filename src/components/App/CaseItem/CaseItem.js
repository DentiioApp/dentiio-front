import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { blue } from '@material-ui/core/colors'
import FavButton from '../../UI/buttons/favButton'
import IconProfile from "../../UI/Icon/Profile/iconProfile";


import { ADD_FAVORITE, addFav } from '../../../store/actions'
import { avgNotes } from '../../../utils'
import { useToasts } from 'react-toast-notifications'
import Keyword from "../../UI/Keywords/keywords";

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

  const KeywordList = () => {
    console.log(props.item.keyword)
    for (let i = 0; i < 9; i++) {
      str = str + i;
    }
    return(
      <Keyword keyword='Fumeur'/>
    )
  }

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
      <FavButton alt='favorite' onClick={(e) => (HandleFav(props.item.id))} /*bool={props.isFavorite}*//>
      <Link to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image='https://upload.wikimedia.org/wikipedia/commons/1/17/Yin_yang.svg'
          /*image={process.env.REACT_APP_BACK_API_URL + "public/images/" + props.item.img}*/
          title='Paella dish'
        />
        <div style={{marginTop: "-45px", marginLeft: "15px"}}>
          <KeywordList/>
        </div>
        <CardContent>
          <Typography variant='h6' style={{color: "black"}} component='p'>
            Title
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.item.presentation}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconProfile color={"primary"}/>
          <Typography variant='body2' color='textSecondary' component='p'>
            Pseudo

            <br/>
            Fonction
          </Typography>
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
