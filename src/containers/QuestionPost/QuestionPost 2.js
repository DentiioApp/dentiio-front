import React from 'react'
import Header from '../../components/App/Header/Header'
import Box from "@material-ui/core/Box";
import PostQuestionForm from "../../components/App/Cases/PostQuestion/PostQuestionForm";

const QuestionPost = () => {
  return (
    <>
        <Box bgcolor="background.paper">
        <Header />
        <PostQuestionForm/>
        </Box>
    </>
  )
}

export default QuestionPost
