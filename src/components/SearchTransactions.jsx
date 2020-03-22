import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import * as Types from '../typedef';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, InputBase,
    Paper, Divider, IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchResultPanel from './SearchResultPanel';
import SearchResultCard from './SearchResultCard';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    card: {
        margin: theme.spacing(2)
    }
}));

/**
 * 
 * @param {Object} props 
 * @param {Types.TransactionItem[]} props.transactions 
 * @param {Function} props.setSection
 */
function SearchTransactions({ setSection, transactions }) {
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        setSection("Search");
    }, [setSection])

    let content = null;
    if (searchText.trim() === "") {
        content = (
            <SearchResultPanel>
                Enter your Query to see a list of matching Transactions
            </SearchResultPanel>
        )
    } else {
        const regex = new RegExp(searchText.trim(), "ig");
        const matchedTransactions = transactions
            .filter(item => {
                return regex.test(item.details)
            })
            .sort((t1, t2) => t1.date - t2.date);

        if (matchedTransactions.length) {
            content = matchedTransactions.map(item => (
                <SearchResultCard key={item.transactionId} className={classes.card} transactionItem={item} />
            ));
        } else {
            content = (
                <SearchResultPanel>
                    No Results Found
                </SearchResultPanel>
            );
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search for a Transaction"
                    inputProps={{ 'aria-label': 'Search for a Transaction' }}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                    onClick={() => setSearchText("")}
                    color="primary"
                    className={classes.iconButton}
                    aria-label="clear">
                    <ClearIcon />
                </IconButton>
            </Paper>
            {
                content
            }
        </Container>
    );
}

export default SearchTransactions;