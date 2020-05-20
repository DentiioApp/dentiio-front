import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from 'react-router-dom';


const home = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();

    if (props.) {
        return <Redirect to='/cases' />
    };

    if (props === "home"){
        return (
            <HomeIcon fontSize={"large"} style={{fill: "white"}}/>
        )
    }

    return (
        
            <HomeOutlinedIcon onClick={() => history.push("/cases")} fontSize={"large"} style={{fill: "white"}} />
        
    )
}

export default home