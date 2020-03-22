import React from 'react';
// eslint-disable-next-line
import * as Types from '../typedef';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    positive: {
        color: green[900]
    },
    negative: {
        color: red[900]
    }
}))

/**
 * 
 * @param {Object} props 
 * @param {Types.TransactionItem} props.transactionItem
 * @param {String} props.className
 */
function SearchResultCard({ transactionItem, className }) {
    const classes = useStyles();
    let content = null;
    if (transactionItem.debit) {
        content = (
            <Typography color="textSecondary" variant="body2" component="p">
                Debit
                    <br />
                <span className={classes.negative}>-&nbsp;{transactionItem.debitText}</span>
            </Typography>
        )
    } else {
        content = (
            <Typography color="textSecondary" variant="body2" component="p">
                Credit
                    <br />
                <span className={classes.positive}>+&nbsp;{transactionItem.creditText}</span>
            </Typography>
        )
    }
    return (
        <Card className={className}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {transactionItem.dateText}
                </Typography>
                <Typography variant="h5" component="h2">
                    {transactionItem.details}
                </Typography>
                {
                    content
                }
                <Typography variant="body2" component="p">
                    Balance
                    <br />
                    {transactionItem.balanceText}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SearchResultCard;