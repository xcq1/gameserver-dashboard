import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import {
  blue500, blue700, blue300,
  red500, pinkA400, blueGrey300, 
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

let x = () => alert("NOPE");
let y = () => { alert("yeah"); return false };

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

let colors = {
  running: blue300,
  stopped: blueGrey300,
  problem: red500,
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Gameserver Dashboard</h1>
          </header>          
          <Table selectable={false} style={{ tableLayout: 'auto' }} fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn style={{paddingLeft:"30px"}}>Actions</TableHeaderColumn>
                <TableHeaderColumn>Ports</TableHeaderColumn>
                <TableHeaderColumn>Link</TableHeaderColumn>
                <TableHeaderColumn style={{paddingLeft:"30px"}}>Settings</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>

              <TableRow onClick={x}>            
                <TableRowColumn>
                  <Chip backgroundColor={colors.problem} id="problem">Problem</Chip>
                </TableRowColumn>
                <TableRowColumn>
                  <span style={{fontSize:"1.25em"}}>ark_ragnarok</span>
                </TableRowColumn>
                <TableRowColumn>             
                  <RaisedButton label="Start" primary={true} disabled={true} style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Stop" secondary={true} disabled={true} style={{margin: "8px"}} />
                  <CircularProgress size={40} thickness={7} style={{verticalAlign:"middle"}}/>
                </TableRowColumn>
                <TableRowColumn>7777, 7778, 27015</TableRowColumn>
                <TableRowColumn>https://.../</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Envs" style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Logs" style={{margin: "8px"}} onClick={y} />
                </TableRowColumn>
              </TableRow>

              <TableRow onClick={x}>
                <TableRowColumn>
                  <Chip backgroundColor={colors.running}>Running</Chip>
                </TableRowColumn>
                <TableRowColumn>
                  <span style={{fontSize:"1.25em"}}>ark_island</span>
                </TableRowColumn>
                <TableRowColumn>                  
                  <RaisedButton label="Start" primary={true} disabled={true} style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Stop" secondary={true} style={{margin: "8px"}} />
                  <CircularProgress size={40} thickness={0} style={{verticalAlign:"middle"}} />
                </TableRowColumn>
                <TableRowColumn>7777, 7778, 27015</TableRowColumn>
                <TableRowColumn>https://.../</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Envs" style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Logs" style={{margin: "8px"}} onClick={y} />
                </TableRowColumn>
              </TableRow>

              <TableRow onClick={x}>
                <TableRowColumn>
                  <Chip backgroundColor={colors.stopped}>Stopped</Chip>
                </TableRowColumn>
                <TableRowColumn>
                  <span style={{fontSize:"1.25em"}}>ark_abberation</span>
                </TableRowColumn>
                <TableRowColumn>                  
                  <RaisedButton label="Start" primary={true} style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Stop" secondary={true} disabled={true} style={{margin: "8px"}} />
                  <CircularProgress size={40} thickness={0} style={{verticalAlign:"middle"}} />
                </TableRowColumn>
                <TableRowColumn>7777, 7778, 27015</TableRowColumn>
                <TableRowColumn>https://.../</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Envs" style={{margin: "8px"}} onClick={y} />
                  <RaisedButton label="Logs" style={{margin: "8px"}} onClick={y} />
                </TableRowColumn>
              </TableRow>         
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
