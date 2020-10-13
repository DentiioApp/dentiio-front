import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function RatingCase() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating name="half-rating" defaultValue={4} precision={1} />
        </div>
    );
}
