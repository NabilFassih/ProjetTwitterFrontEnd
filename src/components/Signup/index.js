import React from 'react';
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

const Signup = (props) => {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        data.role = "user";
        fetchData(data);
    }

    const fetchData = async (dataBody) => {
        const dataUser = await axios.post('http://localhost:8080/signup', dataBody)
            .then(res => {
                return res.data;
            });

        if (dataUser !== undefined) {
            props.history.push('/');
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
                    Inscription
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="Firstname"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Lastname"
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        inputRef={register}
                    />
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
                        S'inscrire
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="" variant="body2" onClick={() => props.history.push('/')}>
                                {"Vous avez un compte ? Connectez-vous"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(Signup);
