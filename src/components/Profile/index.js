import React from 'react';
import { withRouter } from "react-router-dom";
import {
    Container,
    CssBaseline,
    Avatar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        let dataBody = {
            idUser: dataUser.user._id,
            token: "TokenTest"
        }

        axios.post('http://localhost:8080/usertwitter', dataBody)
            .then(res => {
                props.history.push("/user");
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Compte Twitter
                </Typography>
                <a href="http://localhost:8080/auth/twitter">Login twitter</a>
            </div>
        </Container>
    );
}

export default withRouter(Profile);