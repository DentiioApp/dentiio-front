import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from 'react-router-dom';

const favorites = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();

    if (props ===  "favorites"){
        return (
                <IconButton  aria-label="favorite of current user" color="inherit">
                    <StarIcon fontSize={"large"} style={{fill: "white"}}/>
                </IconButton>
        )
    }
    return (
            <IconButton onClick={() => history.push("/favorites")} aria-label="favorite of current user" color="inherit">
                <StarBorderIcon fontSize={"large"} style={{fill: "white"}}/>
            </IconButton>
    )
}

export default favorites