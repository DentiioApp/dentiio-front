import React from 'react'
import Header from '../../components/App/Header/Header'
import Box from "@material-ui/core/Box";
import Palette from "../../components/UI/ColorTheme/Palette";

const QuestionPost = () => {
  return (
    <>
        <Box bgcolor="background.paper">
        <Header />
        <center><h1 style={{ color: Palette.primary, paddingTop: "50px"}}>Bientôt disponible</h1></center>
        </Box>
    </>
  )
}

export default QuestionPost
