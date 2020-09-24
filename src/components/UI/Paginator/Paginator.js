import './paginator.js.scss'
import React from 'react'

const linksTab = []
const Paginator = (props) => {
  for (let i = 1; i < (props.pages + 1); i++) {
    if (linksTab.length < props.pages) { linksTab.push(<button type='button' id='paginator' name='paginator' Style={props.current === i && 'background:lightskyblue'} onClick={props.onChange('paginator')} key={i} value={i}> {i} </button>) }
  }

  return (
    <>
      {linksTab.map((item) => (
        <>{item}</>
      ))}
    </>
  )
}

export default Paginator
