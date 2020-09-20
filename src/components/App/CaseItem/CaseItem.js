import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import FavButton from '../../UI/buttons/favButton'
import IconProfile from "../../UI/Icon/Profile/iconProfile";
import { avgNotes } from '../../../utils'
import Keyword from "../../UI/Keywords/keywords";
import style from "./style"


const CasesItem = (props) => {
  const classes = style()

  const setCurrentCase = (e,item) => {
    //dispatch({type: INIT_CURRENT_CASE, item})
  }
  
  return (

    <Card className={classes.root}>
      <FavButton alt='favorite' item={props.item} /*bool={props.isFavorite}*//>
      <Link onClick={(e)=> setCurrentCase(e,props.item)} to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className={classes.media}
          image='https://upload.wikimedia.org/wikipedia/commons/1/17/Yin_yang.svg'
          /*image={process.env.REACT_APP_BACK_API_URL + "public/images/" + props.item.img}*/
          title='Paella dish'
        />
        <div style={{marginTop: "-45px", marginLeft: "15px"}}>
          {props.item.keyword.map((keyword) => (
              <Keyword keyword={keyword.name}/>
          ))}


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
