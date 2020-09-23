import './paginator.js.scss'
import React from 'react'

let linksTab = [] 
const Paginator = (props) => {
  for (let i = 1; i < (props.pages+1); i++) {
    if (linksTab.length < props.pages )
      linksTab.push(<button type='button' id='paginator' name='paginator' onClick={props.onChange('paginator')} key={i} value={i}> {i} </button>)
  }

  return (
    <>
      {linksTab.map((item)=> (
       <>{item}</>
      ))}
    </>
  )
}

export default Paginator
