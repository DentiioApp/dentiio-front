    import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from "@material-ui/core/IconButton";


const home = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useSelector((state) => state.user)
    const Icon = undefined
    if (user.action === 'cases') {
         return <Redirect to='/cases' />
    };

    <IconButton onClick={() =>  color="inherit" aria-label="menu">
            <HomeOutlinedIcon fontSize={"large"} style={{fill: "white"}} />
        </IconButton>

      <IconButton color="inherit" aria-label="menu">
                <HomeIcon fontSize={"large"} style={{fill: "white"}}/>
            </IconButton>

    return (
        {icon}
    )
}

export default home