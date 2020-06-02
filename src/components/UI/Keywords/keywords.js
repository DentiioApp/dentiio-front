import React from 'react'
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    keyword: {
        color: "white",
        borderRadius: 20,
        fontSize: 14,
        textTransform: "capitalize"
    },
});

const keywords = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles()

    return (
        <Button variant="contained" size={"small"} color="primary" className={classes.keyword}>
            {props.keyword}
        </Button>
    )


}

export default keywords
