import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import {ServerTableRow} from "./components/ServerTableRow";
import {useQuery} from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import {GET_SERVERS} from "./graphql/getServers";

let theme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: blue,
    }
});

export const App = () => {
    const {data, loading, error} = useQuery(GET_SERVERS, {pollInterval: 60000});
    if (error) {
        return <p>{error.name} during GraphQL Query: {error.message}</p>;
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Gameserver Dashboard</h1>
                </header>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell style={{paddingLeft: "30px"}}>Actions</TableCell>
                            <TableCell>Ports</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell style={{paddingLeft: "30px"}}>Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {loading && <TableRow><TableCell><CircularProgress size={100} thickness={7} style={{verticalAlign: "middle"}}/></TableCell></TableRow>}

                        {data && data.servers && data.servers.map(it =>
                            <ServerTableRow key={it.id}
                                            state={it.status}
                                            name={it.id}
                                            ports={it.ports}
                                            link={it.link}
                            />)}

                    </TableBody>
                </Table>
            </div>
        </MuiThemeProvider>
    );
};

export default App;
