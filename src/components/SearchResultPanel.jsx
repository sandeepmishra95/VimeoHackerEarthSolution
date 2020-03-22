import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "center"
    },
    text: {
        margin: theme.spacing(2),
    }
}))

function SearchResultPanel({ children }) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography className={classes.text} variant="subtitle2">
                {children}
            </Typography>
        </Paper>
    );
}

export default SearchResultPanel;