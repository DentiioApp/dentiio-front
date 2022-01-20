import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'
import { addFavCase, removeFavCase } from '../../../../services/Cases'
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../../../store/actions'
import { useToasts } from 'react-toast-notifications'
import { getUserId } from '../../../../services/Users'

const FavButton = (props) => {
  const userId = getUserId()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const { config } = useSelector((state) => state.home)
  // const favorites = useSelector((state) => state.cases.favorites)
  const [toggle, setToggle] = useState(<StarBorderIcon color='primary' />)

  const messages = config.conf.messages.cases.favorite

  useEffect(() => {
    if (props.isFavorite) {
      setToggle(<StarIcon fontSize='default' color='primary' />)
    } else {
      setToggle(<StarBorderIcon color='primary' />)
    }
  }, [props])

  const HandleFav = async (item) => {
    const addOrDelete = props.isFavorite ? removeFavCase : addFavCase
    const response = await addOrDelete(item, userId)

    if (typeof response === 'string') {
      if (response === 'Error') {
        addToast(messages.add.error, { appearance: 'error' })
      } else {
        addToast(messages.add.success, { appearance: 'success' })
        dispatch({ type: ADD_FAVORITE, datas: item })
      }
    } else {
      if (response === 204) {
        addToast(messages.delete.success, { appearance: 'warning' })
        dispatch({ type: REMOVE_FAVORITE, datas: item })
      } else {
        addToast(messages.delete.error, { appearance: 'error' })
      }
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
