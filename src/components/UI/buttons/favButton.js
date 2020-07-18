import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Button from "@material-ui/core/Button";
import StarIcon from '@material-ui/icons/Star';

const favorites = (props) => {
  if (props.bool === 1) {
    return (
        <Button
            variant="contained"
            style={{ float:'right', backgroundColor: 'white'}}
        >
            <StarIcon fontSize={"medium"} color={"primary"}/>
        </Button>
    )
  }
  return (
    <Button
        size={"small"}
        variant="contained"
        style={{ float:'right', backgroundColor: 'white'}}
    >
        <StarBorderIcon fontSize={"medium"} color={"primary"}/>
    </Button>
  )
}

export default favorites
