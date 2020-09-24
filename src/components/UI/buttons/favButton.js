import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'
import { addFavCase } from '../../../services/Cases'
import {ADD_FAVORITE} from '../../../store/actions'
import { useToasts } from 'react-toast-notifications'

const Favorites = (props) => {
  const { config } = useSelector((state) => state.home)
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.cases.favorites)
  const [toggle, setToggle]=useState(<StarBorderIcon color='primary' />)

  useEffect(() => {
    if(props.isFavorite){
      setToggle(<StarIcon fontSize='medium' color='primary' />)
    }
  },[favorites, props] )

  const HandleFav = async (item) => {
    const messages = config.conf.messages.cases.favorite
    const response = await addFavCase(item)
    const regex2 = RegExp(/Error/)

    if (regex2.test(response)) {
      addToast(messages.add.error, { appearance: 'error' })
    } else {
      dispatch({ type: ADD_FAVORITE, data: item })

      addToast(messages.add.success, { appearance: 'success' })
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

export default Favorites
