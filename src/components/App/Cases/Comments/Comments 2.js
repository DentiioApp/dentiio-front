import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

const Comments = (props) => {

  return (
    <>
      <Container maxWidth="lg">
        {props.datas["commentaires"].map((value, index) => (
          <div key={value['@id']}>
            <p> User: {value["user"].nom}</p>
            <p> Commentaire: {value["comment"]}</p>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Comments;
