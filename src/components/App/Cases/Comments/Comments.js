import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

const Comments = (props) => {
    for (const [key, value] of Object.entries(props.item)) {
        console.log(`${key}: ${value}`);
        
        console.log(props);
    }
  return (
    <>
      <Container maxWidth="lg">
        {Object.entries(props.item).map((value, index) => (
          <span id={index}>{value}</span>
        ))}
      </Container>
    </>
  );
};

export default Comments;
