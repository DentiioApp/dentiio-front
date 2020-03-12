import React from 'react';
import './titleHeader.scss'
import Icon from "../../../images/titleHeader.svg";

function titleHeader() {
  return (
    <>
      <img className='titleHeader' src={Icon}/>
    </>
  );
}

export default titleHeader;