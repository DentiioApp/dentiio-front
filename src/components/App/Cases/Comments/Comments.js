import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

const Comments = (props) => {
  
  return (
    <>
      <Container maxWidth="lg">
        {props.datas["commentaires"].map((value, index) => (
          <>
          <p>User: {value["user"].nom}</p>
          <p>Commentaire: {value["comment"]}</p>
          </>
        ))}
      </Container>
    </>
  );
};

export default Comments;
