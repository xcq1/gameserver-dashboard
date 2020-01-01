import React from 'react';
import {TableRow, TableRowColumn} from "material-ui/Table";
import Chip from "material-ui/Chip";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import {blue300, blueGrey300, lightBlue300, red500, yellow300} from "material-ui/styles/colors";
import {useMutation} from "@apollo/react-hooks";
import {START_SERVER} from "../graphql/startServer";
import {STOP_SERVER} from "../graphql/stopServer";

const colors = {
    running: blue300,
    stopped: blueGrey300,
    problem: red500,
    starting: lightBlue300,
    stopping: yellow300
};

export const ServerTableRow = ({state, name, ports, link, onStart, onStop}) => {
    let chip = undefined;
    let canStart = false;
    let canStop = false;
    let isProgress = false;

    switch (state) {
        default:
        case 'PROBLEM':
            chip = <Chip backgroundColor={colors.problem} className="flash-progress">Problem</Chip>;
            isProgress = true;
            break;
        case 'STOPPED':
            chip = <Chip backgroundColor={colors.stopped}>Stopped</Chip>;
            canStart = true;
            break;
        case 'STARTING':
            chip = <Chip backgroundColor={colors.starting} className="flash-progress">Starting</Chip>;
            isProgress = true;
            break;
        case 'RUNNING':
            chip = <Chip backgroundColor={colors.running}>Running</Chip>;
            canStop = true;
            break;
        case 'STOPPING':
            chip = <Chip backgroundColor={colors.stopping} className="flash-progress">Stopping</Chip>;
            isProgress = true;
            break;
    }

    const [start, {startData}] = useMutation(START_SERVER, {
        variables: {name}
    });
    const [stop, {stopData}] = useMutation(STOP_SERVER, {
        variables: {name}
    });

    return <TableRow>
        <TableRowColumn>
            {chip}
        </TableRowColumn>
        <TableRowColumn>
            <span style={{fontSize: "1.25em"}}>{name}</span>
        </TableRowColumn>
        <TableRowColumn>
            <RaisedButton label="Start" primary={true} disabled={!canStart} style={{margin: "8px"}} onClick={start}/>
            <RaisedButton label="Stop" secondary={true} disabled={!canStop} style={{margin: "8px"}} onClick={stop}/>
            {isProgress && <CircularProgress size={40} thickness={7} style={{verticalAlign: "middle"}}/>}
        </TableRowColumn>
        <TableRowColumn>{ports.map(it => `${it.protocol}: ${it.number}`)}</TableRowColumn>
        <TableRowColumn>{link}</TableRowColumn>
        <TableRowColumn>
            <RaisedButton label="Envs" style={{margin: "8px"}} disabled={true}/>
            <RaisedButton label="Logs" style={{margin: "8px"}} disabled={true}/>
        </TableRowColumn>
    </TableRow>
};