import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {useDispatch} from "react-redux";
import {getUserById, getUserId} from "../../../services/Users";
import {SET_USER} from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

export default function RatingCase() {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const dispatch = useDispatch()


    const ResponseUser = async () => {
        const response = await getUserById(getUserId())
        setUser(response.datas)

        if (Object.entries(response).length !== 0) {
            dispatch({ type: SET_USER, datas: response.datas })
        }
    }

    useEffect(() => {
        if (Object.entries(user).length === 0) {
            ResponseUser()
        }
    })

    const catchSubmit = async (e) => {
        if(e !== undefined){
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant='h6'>
                Noter ce cas
            </Typography>
            <Rating style={{alignSelf: 'center'}} name="half-rating" defaultValue={4} precision={0.5} onClick={e => catchSubmit(e.target.value)}/>
        </div>
    );
}
