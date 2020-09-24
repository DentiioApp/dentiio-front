import './paginator.js.scss'
import React from 'react'

const linksTab = []
const Paginator = (props) => {
  for (let i = 1; i < (props.pages+1); i++) {
    const style = Number(props.current) === Number(i) ? 'background:lightskyblue': 'background:white'
    if (linksTab.length < props.pages) {
      linksTab.push(
        <button type='button' id='paginator' name='paginator' Style={style} onClick={props.onChange('paginator')} key={i} value={i}> {i} </button>
      ) 
    }
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
