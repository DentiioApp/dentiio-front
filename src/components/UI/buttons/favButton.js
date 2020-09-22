import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'
import { ADD_FAVORITE, addFav } from '../../../store/actions'
import { useToasts } from 'react-toast-notifications'

const Favorites = (props) => {
  const iUser = useSelector((state) => state.user.id)
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const { config } = useSelector((state) => state.home)

  const HandleFav = async (iItem) => {
    const messages = config.conf.messages.cases.favorite
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

  if (props.bool === 1) {
    return (
      <Button
        variant='contained'
        style={{ float: 'right', backgroundColor: 'white' }}
      >
        <StarIcon fontSize='medium' color='primary' />
      </Button>
    )
  }
  return (
    <Button
      size='small'
      variant='contained'
      style={{ float: 'right', backgroundColor: 'white' }}
      onClick={() => (HandleFav(props.item.id))}
    >
      <StarBorderIcon color='primary' />
    </Button>
  )
}

export default Favorites
