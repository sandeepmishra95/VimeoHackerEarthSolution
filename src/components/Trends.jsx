import React, { useEffect, useMemo } from 'react';
// eslint-disable-next-line
import * as Types from '../typedef';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Paper, Typography, Box
} from '@material-ui/core';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    root: {
        height: "70vh",
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
}));

const monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
}

function prepareReduceObject() {
    const res = {};
    for (let i = 0; i < 12; i++) {
        res[i] = {
            credit: 0,
            debit: 0
        }
    }
    return res;
}

/**
 * 
 * @param {Types.TransactionItem[]} transactions
 */
function computeMonthWiseData(transactions) {
    return transactions.reduce((acc, current) => {
        const month = current.date.getMonth();
        if (!acc[month]) {
            acc[month] = {
                credit: 0,
                debit: 0
            }
        }
        if (current.debit) {
            acc[month].debit += current.debit;
        }
        if (current.credit) {
            acc[month].credit += current.credit;
        }
        return acc;
    }, prepareReduceObject());
}

function convertDataForBarChart(data) {
    return Object.keys(data).map(key => {
        return {
            month: monthMap[key],
            debit: data[key].debit,
            credit: data[key].credit
        }
    })
}

/**
 * 
 * @param {Object} props 
 * @param {Types.TransactionItem[]} props.transactions 
 * @param {Function} props.setSection
 */
function Trends({ setSection, transactions }) {
    const classes = useStyles();
    useEffect(() => {
        setSection("Trends");
    }, [setSection])

    const monthWiseData = useMemo(() => convertDataForBarChart(computeMonthWiseData(transactions)), [transactions])

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Box p={1} m={1}>
                    <Typography variant="h6">
                        Monthly Credit/Debit Data
                    </Typography>
                </Box>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                        width={500}
                        height={250}
                        data={monthWiseData} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="credit" fill={green[500]} />
                        <Bar dataKey="debit" fill={red[500]} />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Container>
    );
}

export default Trends;