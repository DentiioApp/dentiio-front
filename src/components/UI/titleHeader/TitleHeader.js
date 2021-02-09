import React from 'react'
import './titleHeader.scss'
import Icon from '../../../images/titleHeader.svg'
import { Link } from 'react-router-dom'

function titleHeader () {
  return (

    <Link to='/cases'>
      <img alt='' width={"140px"} src={Icon} />
    </Link>

  )
}

export default titleHeader
