import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

const notification = (props) => {

    return (
        <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsOutlinedIcon fontSize={"large"} style={{fill: "white"}}/>
            </Badge>
        </IconButton>
    )
}

export default notification