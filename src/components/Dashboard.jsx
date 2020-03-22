import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { AccountDetails } from '../services';
import { accountDetailsReducer, initialState } from '../reducers/accountDetailsReducer';
import {
    Backdrop, CircularProgress,
    makeStyles, AppBar, Typography, Toolbar, IconButton,
    Drawer, List, ListItem, ListItemIcon, ListItemText,
    useMediaQuery, useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';
import SearchTransactions from './SearchTransactions';
import Trends from './Trends';

const useStyles = makeStyles(theme => ({
    root: {
        flexFlow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    sideMenu: {
        width: '20vw'
    }
}))

function Dashboard(props) {
    const classes = useStyles();
    const [section, setSection] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [state, dispatch] = useReducer(accountDetailsReducer, initialState);
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        async function fetchAccountData() {
            let transactions = [];
            try {
                transactions = await AccountDetails.fetchAccountDetails();
            } catch (error) {
                console.error();
                transactions = [];
            }
            dispatch({
                type: "INIT",
                payload: transactions
            })
        }
        fetchAccountData();
    }, []);

    const toggleSortBy = useCallback((sortBy) => {
        dispatch({
            type: "TOGGLE_SORT_BY",
            payload: sortBy
        })
    }, [dispatch]);

    const setPage = useCallback((page) => {
        dispatch({
            type: "SET_PAGE",
            payload: page
        })
    }, [dispatch]);

    const { isLoading, pageSize, currentPage, transactions, sortBy, sortOrder } = state;

    if (isLoading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        );
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => setMenuOpen(open => !open)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Account Details
                            {
                                section &&
                                <>
                                    &nbsp;|&nbsp;
                                    <Typography variant="subtitle2" component="span">{section}</Typography>
                                </>
                            }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor={bigScreen ? "left" : "bottom"}
                    open={menuOpen} onClose={() => setMenuOpen(false)}>
                    <div
                        className={classes.sideMenu}
                        role="presentation"
                        onClick={() => setMenuOpen(false)}
                        onKeyDown={() => setMenuOpen(false)} >
                        <List>
                            <ListItem button component={Link} to="/">
                                <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                                <ListItemText primary="Details" />
                            </ListItem>
                            <ListItem button component={Link} to="/search">
                                <ListItemIcon><SearchIcon /></ListItemIcon>
                                <ListItemText primary="Search" />
                            </ListItem>
                            <ListItem button component={Link} to="/trends">
                                <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                                <ListItemText primary="Trends" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <Switch>
                    <Route exact path="/">
                        <TransactionDetails
                            setSection={setSection}
                            transactions={transactions}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            setPage={setPage}
                            toggleSortBy={toggleSortBy}
                        />
                    </Route>
                    <Route exact path="/search">
                        <SearchTransactions
                            setSection={setSection}
                            transactions={transactions} />
                    </Route>
                    <Route exact path="/trends">
                        <Trends
                            setSection={setSection}
                            transactions={transactions} />
                    </Route>
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        );
    }

}

export default Dashboard;