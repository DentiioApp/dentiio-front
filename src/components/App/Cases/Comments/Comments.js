import { Grid, Paper } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import UserAvatar from "../../../UI/Avatars/UserAvatar";
import { sendComments } from "../../../../services/Comment"
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Comments = (props) => {
  const currents_user = useSelector((state) => (state.user.current_user))
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
  
  const formatDate = (date) => {
    var diff = {};
    let commentPostedDate = new Date(Date.parse(date));
    let currentDate = new Date();
    let tmp = currentDate - commentPostedDate;
    let finalDate = '';
    
    tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60; // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie entière)
    diff.min = tmp % 60; // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
    diff.hour = tmp % 24; // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
    diff.day = tmp;
        
    var montRaw = String(commentPostedDate.getUTCMonth() + 1);
    const MONTH = montRaw.length < 2 ? "0" + montRaw : montRaw;
    var dayRaw = String(commentPostedDate.getUTCDate()); //+ 1
    const DAY = dayRaw.length < 2 ? "0" + dayRaw : dayRaw;
    const YEAR = String(commentPostedDate.getUTCFullYear());
    
    if (diff.min < 1 && diff.hour < 1) {
      finalDate = `à l'instant`;
    } else if (diff.min >= 1 && diff.min < 60) {
      finalDate = `il y a ${diff.min} minute${diff.min > 1 ? "s" : ""}`;
    } else if (diff.hour > 1 && diff.hour < 3) {
      finalDate = `il y a ${diff.hour} heure${diff.hour > 1 ? "s" : ""}`;
    } else {
      finalDate = `${DAY}/${MONTH}/${YEAR}`;
    }    
    
    return finalDate;   
  }

  return (
    <div
      style={{
        padding: 14,
        maxWidth: "100%",
        margin: "0 auto",
        minWidth: "100%",
      }}
    >
      <h2 id={"discussion"}>Discussion</h2>
      {props.datas["commentaires"].map((value, index) => (
        <div key={index }>
          <Paper style={{ padding: "40px 20px" }} key={index }>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <UserAvatar avatar={value["user"]["avatar"]} width="30px" />
              </Grid>
              <Grid justifycontent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {value["user"].pseudo}
                </h4>
                <p style={{ textAlign: "left" }}>{value["comment"]}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  {formatDate(value["createdAt"])}
                </p>
              </Grid>
            </Grid>
          </Paper>
        </div>
      ))}
      <form>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={1}>
            <UserAvatar width={'50px'} avatar={currents_user?.avatar} />
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
          <Grid item xs={1} align="right">
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
