import React from 'react';
import './home.css';
import { withRouter } from "react-router-dom";
import {
    Container,
    CssBaseline,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Link
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

const Home = (props) => {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        fetchData(data);
    }

    const fetchData = async (dataBody) => {
        const dataUser = await axios.post('http://localhost:8080/login', dataBody)
            .then(res => {
                return res.data;
            });

        localStorage.setItem('dataUser', JSON.stringify(dataUser));

        if (dataUser !== undefined) {
            if (dataUser.user.role === "admin") {
                props.history.push('/admin')
            } else if ( dataUser.user.role === "user") {
                props.history.push('/user')
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Se connecter
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="" variant="body2" onClick={() => props.history.push('/signup')}>
                                {"Vous n'avez pas de compte ? Inscrivez-vous"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(Home);
