import React from 'react'
import './titleHeader.scss'
import Icon from '../../../images/titleHeaderMobile.svg'

function titleHeaderMobile () {
  return (
    <>
      <a href="/cases"><img className='titleHeaderMobile' alt='' src={Icon} /></a>
    </>
  )
}

export default titleHeaderMobile
