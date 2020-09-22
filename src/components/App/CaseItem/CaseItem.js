import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import FavButton from '../../UI/buttons/favButton'
import IconProfile from '../../UI/Icon/Profile/iconProfile'
import { avgNotes } from '../../../utils'

import Keyword from '../../UI/Keywords/keywords'
import ChatIcon from '@material-ui/icons/Chat'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import './caseItem.scss'

const CasesItem = (props) => {
  const setCurrentCase = (e, item) => {
    // dispatch({type: INIT_CURRENT_CASE, item})
  }

  return (

    <Card className='root' key={props.item.id}>
      <FavButton alt='favorite' item={props.item} /* bool={props.isFavorite} *//>
      <Link onClick={(e) => setCurrentCase(e, props.item)} to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className='media'
          image='https://upload.wikimedia.org/wikipedia/commons/1/17/Yin_yang.svg'
          /* image={process.env.REACT_APP_BACK_API_URL + "public/images/" + props.item.img} */
          title={props.item.title}
        />
        <div style={{ marginTop: '-35px', marginLeft: '15px' }}>
          {props.item.keyword.map((keyword, index) => (
            <Keyword key={index} keyword={keyword.name} />
          ))}
        </div>
        <CardContent>
          <Typography variant='h6' style={{ color: 'black' }} component='p' className='title'>
            {props.item.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p' className='presentation'>
            {props.item.presentation}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconProfile color='primary' />
          <Typography variant='body2' style={{ color: 'black', textTransform: 'capitalize' }} component='p'>
            {props.item.user.pseudo}
            <br />
            {props.item.user.job}
          </Typography>
          <div className='grow' style={{ align: 'right' }} />
          {/* <TeethButton> */}

          {/* </TeethButton> */}
          {/* <CommentButton aria-label="comments"> */}
          <Typography variant='h6' color='textSecondary' component='p'>
            {props.item.commentaires.length}
          </Typography>
          <ChatIcon color='primary' fontSize='default' className='pr-15' />
          {/* </CommentButton> */}
          {/* <NoteButton aria-label="comments"> */}
          <Typography variant='h6' color='textSecondary' component='p'>
            {avgNotes(props.item.notations)}
          </Typography>
          <StarHalfIcon color='primary' fontSize='default' />
          {/* </NoteButton> */}
        </CardActions>
      </Link>
    </Card>
  )
}

export default CasesItem
