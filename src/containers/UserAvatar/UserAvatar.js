import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'
import {Piece} from "avataaars";
import Avatar from "avataaars";
import {Mouth} from "../../components/UI/Avatars/Library";
import TabAvatar from "./Tab"

const UserAvatar = () => {
  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='profile' />
      <TabAvatar/>
      <div>
        <Piece pieceType="eyes" pieceSize="100" eyeType="Dizzy"/>
        <Piece pieceType="eyebrows" pieceSize="100" eyebrowType="RaisedExcited"/>
        <Piece pieceType="accessories" pieceSize="100" accessoriesType="Round"/>
        <Piece pieceType="top" pieceSize="100" topType="LongHairFro" hairColor="Red"/>
        <Piece pieceType="facialHair" pieceSize="100" facialHairType="BeardMajestic"/>
        <Piece pieceType="clothe" pieceSize="100" clotheType="Hoodie" clotheColor="Red"/>
        <Piece pieceType="graphics" pieceSize="100" graphicType="Skull" />
        <Piece pieceType="skin" pieceSize="100" skinColor="Brown" />
      </div>
    </>
  )
}

export default UserAvatar


