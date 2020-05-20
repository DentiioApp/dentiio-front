import React from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from 'react-router-dom';
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";


const profile = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();
    if (props ===  "profile") {
        return (
            <IconButton
                onClick={() => history.push("/profile")}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
            >
                <PersonIcon fontSize={"large"} style={{fill: "white"}}/>
            </IconButton>
        )
    }
    return (
        <IconButton
            onClick={() => history.push("/profile")}
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
        >
            <PermIdentityIcon fontSize={"large"} style={{fill: "white"}}/>
        </IconButton>

    )
}

export default profile