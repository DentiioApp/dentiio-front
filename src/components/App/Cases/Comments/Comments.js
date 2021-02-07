import React from "react";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import UserAvatar from "../../../UI/Avatars/UserAvatar";

const Comments = (props) => {

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
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={1}>
          {/* <UserAvatar avatar={value["user"]["avatar"]} width="30px" /> */}
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="filled-textarea"
            label="Commentez le cas"
            multiline
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};


export default Comments;
