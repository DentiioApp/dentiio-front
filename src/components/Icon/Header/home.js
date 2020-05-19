import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from 'react-router-dom';


const home = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();

    if (props === "home"){
        return (
            <IconButton color="inherit" aria-label="menu">
                <HomeIcon fontSize={"large"} style={{fill: "white"}}/>
            </IconButton>
        )
    }
    return (
        <IconButton onClick={() => history.push("/cases")} color="inherit" aria-label="menu">
            <HomeOutlinedIcon fontSize={"large"} style={{fill: "white"}} />
        </IconButton>
    )
}

export default home