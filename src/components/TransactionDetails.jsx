import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import * as Types from '../typedef';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    positive: {
        color: green[900]
    },
    negative: {
        color: red[900]
    }
});

/**
 * 
 * @param {Object} props 
 * @param {Types.TransactionItem[]} props.transactions 
 * @param {Function} props.setSection
 * @param {Types.SortBy} props.sortBy
 * @param {Types.SortOrder} props.sortOrder 
 * @param {Number} props.currentPage
 * @param {Number} props.pageSize
 * @param {Function} props.setPage
 * @param {Function} props.toggleSortBy
 */
function TransactionDetails({ setSection, transactions, sortBy, sortOrder, currentPage, pageSize, setPage, toggleSortBy }) {
    const classes = useStyles();
    const containerRef = useRef();
    // set unmount hook to reset current page to 0 on unmount
    useEffect(() => {
        setSection("Transactions");
        return () => setPage(0);
    }, [setPage, setSection])

    useEffect(() => {
        containerRef.current && containerRef.current.scrollTo(0, 0);
    }, [currentPage, sortOrder, sortBy])

    const displayTransactions = transactions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    function getClassnameForValue(value) {
        return clsx({
            [classes.positive]: value > 0,
            [classes.negative]: value < 0,
        })
    }

    return (
        <Paper className={classes.root}>
            <TableContainer ref={containerRef} className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                #
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === "date"}
                                    direction={sortOrder}
                                    onClick={() => toggleSortBy("date")}>
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === "valueDate"}
                                    direction={sortOrder}
                                    onClick={() => toggleSortBy("valueDate")}>
                                    Value Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="left">
                                Transaction Details
                            </TableCell>
                            <TableCell align="center">
                                Debit
                            </TableCell>
                            <TableCell align="center">
                                Credit
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortBy === "balance"}
                                    direction={sortOrder}
                                    onClick={() => toggleSortBy("balance")}>
                                    Balance
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            displayTransactions.map((item, index) => {
                                return (
                                    <TableRow key={item.transactionId}>
                                        <TableCell align="left">
                                            {index + currentPage * pageSize + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.dateText}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.valueDateText}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.details}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.negative}>
                                            {
                                                item.debit ?
                                                    <span>
                                                        -&nbsp;{item.debitText}
                                                    </span>
                                                    : null
                                            }
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.positive}>
                                            {
                                                item.credit ?
                                                    <span>
                                                        +&nbsp;{item.creditText}
                                                    </span>
                                                    : null
                                            }
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={getClassnameForValue(item.balance)}>
                                            {
                                                item.balance ?
                                                    <span>
                                                        {item.balance > 0 ? "+" : "-"}&nbsp;{item.balanceText}
                                                    </span>
                                                    : null
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={transactions.length}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[pageSize]}
                page={currentPage}
                onChangePage={(e, page) => setPage(page)}
            />
        </Paper>
    );
}

export default TransactionDetails;