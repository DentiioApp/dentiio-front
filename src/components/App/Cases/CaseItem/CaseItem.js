import './caseItem.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import FavButton from '../../../UI/buttons/FavButton/FavButton'
import UserAvatar from '../../../UI/Avatars/UserAvatar'
import { avgNotes } from '../../../../utils'
import ChatIcon from '@material-ui/icons/Chat'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const CasesItem = (props) => {
  const img = () => {
    if (props.item.imgClinicalCaseOmnipratiques) {
      return props.item.imgClinicalCaseOmnipratiques.filter(function (i) {
        return i.isPrincipal === true
      }).map(function (img) {
        return img.path
      })
    }
  }

  return(
    <Card key={props.item.id}>
      <FavButton alt='favorite' value={props.item} isFavorite={props.favorite} />
      <Link to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className='media'
          image={process.env.REACT_APP_BACK_URL + "images/" + (img() !== undefined ? img()[0] : '')}
          title={props.item.title}
        />
{/*        <div style={{ marginTop: '-35px', marginLeft: '15px' }}>
          {props.item.keyword && props.item.keyword.map((keyword, index) => (
            <Keyword key={index} keyword={keyword.name} />
          ))}
        </div>*/}
        <CardContent>
          <Typography variant='h6' style={{ color: 'black' }} component='p' className='title'>
            {props.item.title}
          </Typography>
        </CardContent>
        <br />
        <CardActions disableSpacing>
          <UserAvatar avatar={props?.item?.User?.avatar} width='50px' />
          <Typography variant='body2' style={{ color: 'black', textTransform: 'capitalize' }} component='p'>
            { props?.item?.User?.pseudo }
            <br />
            {  props?.item?.User?.job?.name}
          </Typography>
          <div className='grow' style={{ align: 'right' }} />
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.item.commentaires.length}
          </Typography>
          <ChatIcon color='primary' fontSize='default' className='pr-15' />
          <Typography variant='body2' color='textSecondary' component='p'>
            { props.item.notations ? (isNaN(props.item.notations) ? avgNotes(props.item.notations) : 'Aucune note') : null }
          </Typography>
          {(isNaN(props.item.notations) ?
                  <StarIcon color='primary' fontSize='default' /> :
                  <StarBorderIcon color='primary' fontSize='default' />
          )}

        </CardActions>
      </Link>
    </Card>
  )
}

export default CasesItem
