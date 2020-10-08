import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'
import { addFavCase, removeFavCase } from '../../../services/Cases'
import { ADD_FAVORITE } from '../../../store/actions'
import { useToasts } from 'react-toast-notifications'
import { getUserId } from '../../../services/Users'

const FavButton = (props) => {
  const userId = getUserId()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const { config } = useSelector((state) => state.home)
  const favorites = useSelector((state) => state.cases.favorites)
  const [toggle, setToggle] = useState(<StarBorderIcon color='primary' />)

  const messages = config.conf.messages.cases.favorite

  useEffect(() => {
    if (props.isFavorite) {
      setToggle(<StarIcon fontSize='default' color='primary' />)
    }
  }, [Object.keys(favorites).length, props])

  const HandleFav = (item) => {
    console.log('TEddST :', item)
    let addOrDelete = props.isFavorite ? addFavCase() : removeFavCase()  
    const response = addOrDelete(item, userId)

    if (Object.keys(response).length < 1) {
      addToast(messages.add.error, { appearance: 'error' })
    } else {
      addToast(messages.add.success, { appearance: 'success' })
      dispatch({ type: ADD_FAVORITE, datas: item })
    }
  }

  const handleChange = prop => event => {
    HandleFav(props.value)
  }

  return (
    <Button
      key={props.value.id}
      variant='contained'
      style={{ float: 'right', backgroundColor: 'white' }}
      onClick={handleChange('')}
    >
      {toggle}
    </Button>
  )
}

export default FavButton
