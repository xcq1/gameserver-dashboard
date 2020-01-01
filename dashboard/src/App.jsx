import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,} from 'material-ui/Table';
import {blue500, blue700, darkBlack, fullBlack, grey100, grey300, grey400, grey500, pinkA400, white,} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import {ServerTableRow} from "./components/ServerTableRow";
import {useQuery} from "@apollo/react-hooks";
import CircularProgress from "material-ui/CircularProgress";
import {GET_SERVERS} from "./graphql/getServers";

let theme = {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        primary3Color: grey400,
        accent1Color: pinkA400,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: blue500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
};

export const App = () => {
    const {data, loading, error} = useQuery(GET_SERVERS, {pollInterval: 60000});
    if (error) {
        return <p>{error.name} during GraphQL Query: {error.message}</p>;
    }
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Gameserver Dashboard</h1>
                </header>
                <Table selectable={false} style={{tableLayout: 'auto'}} fixedHeader={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{paddingLeft: "30px"}}>Actions</TableHeaderColumn>
                            <TableHeaderColumn>Ports</TableHeaderColumn>
                            <TableHeaderColumn>Link</TableHeaderColumn>
                            <TableHeaderColumn style={{paddingLeft: "30px"}}>Settings</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>

                        {loading && <CircularProgress size={100} thickness={7} style={{verticalAlign: "middle"}}/>}

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
