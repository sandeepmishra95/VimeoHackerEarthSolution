import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import Dashboard from './components/Dashboard';

const theme = createMuiTheme({});

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Dashboard />
            </ThemeProvider>
        </Router>
    );
}

export default App;
