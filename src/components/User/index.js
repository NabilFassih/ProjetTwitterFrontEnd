import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import {Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FixedSizeList } from 'react-window';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
    //   width: '100%',
      marginBottom: "50px",
      marginTop: "50px"
    },
    // container: {
    //   maxHeight: 440,
    // },
    list: {
        width:"100%",
        backgroundColor: theme.palette.background.paper,
        marginBottom: "20px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }
    
}));

const User = (props) => {
    const classes = useStyles();
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const userIdTwitter = JSON.parse(localStorage.getItem('userIdTwitter'));
    const [ tokenTwitter, setTokenTwitter ] = useState(false);
    const [ tweets, setTweets ] = useState(false);
    const [ errors, setErrors ] = useState(false);
    const [ topTweets, setTopTweets ] = useState(false);
    const [ topTweetsCities, setTopTweetsCities] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    async function fetchData() {
        const res = await axios.get(`http://localhost:8080/usertwitter/${dataUser.user._id}`)
            .then(res => {
                setTokenTwitter(res.data.token);
                axios.get(`http://localhost:8080/usertwitter/${res.data.token}/tweets`)
                    .then(res => setTweets(res.data))
                    .catch(err => setErrors(err));
                })
            .catch(err => setErrors(err));
    }

    async function fetchDataTopTweets() {
        axios.get(`http://localhost:8080/trends`)
        .then(res => setTopTweetsCities(res.data))
        .catch(err => setErrors(err));
    }

    useEffect(() => {
        if (dataUser) {
            fetchData();
            fetchDataTopTweets();
        }
    }, []);

    function renderRow(props) {
        const { index, style } = props;
        if (topTweetsCities[props.data.city] !== undefined) {
            if (topTweetsCities[props.data.city][index] !== undefined) {
                return (
                    <ListItem style={style} divider={true} key={index}>
                        <ListItemText primary={topTweetsCities[props.data.city][index].libelleTweet} secondary={topTweetsCities[props.data.city][index].volumeTweet} />
                    </ListItem>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };
    // console.log(topTweetsCities["Los angeles"][0]);
    return(
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
            <h3>Vos dernier tweets :</h3>
                {
                    tokenTwitter && tweets ?
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Prénom Nom</TableCell>
                                        <TableCell>Nom compte Twitter</TableCell>
                                        <TableCell>Tweet</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tweets.map((tweet) => (
                                    <TableRow key={tweet.userTwitterId}>
                                        <TableCell>{tweet.name}</TableCell>
                                        <TableCell>{tweet.screen_name}</TableCell>
                                        <TableCell>{tweet.text}</TableCell>
                                        <TableCell>{tweet.dateTweet}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> 
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tweets.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> 
                    </Paper> :
                    <div>
                        Veuillez lier votre compte Twitter <a href='/profile'>Lier son compte</a>
                    </div>
                }
                <h3>Top 10 des mots les plus utilisés dans les tweets pour chaque ville :</h3>
                <div className={classes.root}>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Paris</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Paris"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Los angeles</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Los angeles"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>New York</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "New York"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Londres</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Londres"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Rio de Janeiro</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Rio de Janeiro"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Dubai</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Dubai"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                            <Typography className={classes.heading}>Tokyo</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedSizeList className={classes.list} height={465} width={912} itemSize={46} itemCount={10} itemData={{city: "Tokyo"}}>
                                {renderRow}
                            </FixedSizeList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        </Container>
    );
}

export default withRouter(User);