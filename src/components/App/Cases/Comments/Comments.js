import { Grid, Paper } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import UserAvatar from "../../../UI/Avatars/UserAvatar";
import { sendComments } from "../../../../services/Comment"

const Comments = (props) => {
   const initVals = {
     comment: '',
   };
  const [values, setValues] = useState(initVals); 
  const handleChange = prop => event => {
    if (prop = 'comment') {
      setValues({ ...values, [prop]: event.target.value });
    }
  }

  const handleSubmit = () => {
    sendComments(values.comment, props.datas["@id"]).then((res) => {
      window.location.reload();
    });
  }
  return (
    <div style={{ padding: 14, maxWidth: "100%", margin: "0 auto" }}>
      <h1>Commentaire</h1>
      {props.datas["commentaires"].map((value, index) => (
        <>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <UserAvatar avatar={value["user"]["avatar"]} width="30px" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {value["user"].nom}
                </h4>
                <p style={{ textAlign: "left" }}>{value["comment"]}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  {value["createdAt"]}
                </p>
              </Grid>
            </Grid>
          </Paper>
        </>
      ))}
      <form>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={1}>
            <UserAvatar avatar={props.useravatar} width="50px" />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="filled-textarea"
              label="Commentez le cas"
              multiline
              variant="filled"
              fullWidth
              onChange={handleChange('comment')}
            />
          </Grid>
          <Grid xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon onClick={handleSubmit} />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};


export default Comments;
