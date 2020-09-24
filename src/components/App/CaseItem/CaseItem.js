import './caseItem.scss'
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

const CasesItem = (props) => {
  const img = () => {
    if (props.item.imageClinicalCases) {
      return props.item.imageClinicalCases.filter(function (i) {
        return i.type.name === 'principal'
      }).map(function (img) {
        return img.path
      })
    }
  }

  return (
    <Card className='root' key={props.item.id}>
      <FavButton alt='favorite' value={props.item} isFavorite={props.favorite} />
      <Link to={`/case/${props.item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          className='media'
          image={'https://api.dentiio.fr/images/' + img()[0]}
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
            {props.item.user.job.name}
          </Typography>
          <div className='grow' style={{ align: 'right' }} />
          <Typography variant='h6' color='textSecondary' component='p'>
            {props.item.commentaires.length}
          </Typography>
          <ChatIcon color='primary' fontSize='large' className='pr-15' />
          <Typography variant='h6' color='textSecondary' component='p'>
            {avgNotes(props.item.notations)}
          </Typography>
          <StarHalfIcon color='primary' fontSize='default' />
        </CardActions>
      </Link>
    </Card>
  )
}

export default CasesItem
