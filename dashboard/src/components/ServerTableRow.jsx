import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {blue, blueGrey, lightBlue, red, yellow} from "@material-ui/core/colors";
import {useMutation} from "@apollo/react-hooks";
import {START_SERVER} from "../graphql/startServer";
import {STOP_SERVER} from "../graphql/stopServer";
import Link from "@material-ui/core/Link";

const colors = {
    running: blue[300],
    stopped: blueGrey[300],
    problem: red[500],
    starting: lightBlue[300],
    stopping: yellow[300]
};

export const ServerTableRow = ({state, name, ports, link}) => {
    let chip = undefined;
    let canStart = false;
    let canStop = false;
    let isProgress = false;

    switch (state) {
        default:
        case 'PROBLEM':
            chip = <Chip style={{backgroundColor: colors.problem}} className="flash-progress" label="Problem"/>;
            isProgress = true;
            break;
        case 'STOPPED':
            chip = <Chip style={{backgroundColor: colors.stopped}} label="Stopped"/>;
            canStart = true;
            break;
        case 'STARTING':
            chip = <Chip style={{backgroundColor: colors.starting}} className="flash-progress" label="Starting"/>;
            isProgress = true;
            break;
        case 'RUNNING':
            chip = <Chip style={{backgroundColor: colors.running}} label="Running"/>;
            canStop = true;
            break;
        case 'STOPPING':
            chip = <Chip style={{backgroundColor: colors.stopping}} className="flash-progress" label="Stopping"/>;
            isProgress = true;
            break;
    }

    const [start] = useMutation(START_SERVER, {
        variables: {name}
    });
    const [stop] = useMutation(STOP_SERVER, {
        variables: {name}
    });

    return <TableRow>
        <TableCell>
            {chip}
        </TableCell>
        <TableCell>
            <span style={{fontSize: "1.25em"}}>{name}</span>
        </TableCell>
        <TableCell>
            <Button variant="contained" color="primary" disabled={!canStart} style={{margin: "0 8px", minWidth: "88px"}} onClick={start}>Start</Button>
            <Button variant="contained" color="secondary" disabled={!canStop} style={{margin: "0 8px", minWidth: "88px"}} onClick={stop}>Stop</Button>
            {isProgress && <CircularProgress size={40} thickness={7} style={{verticalAlign: "middle"}}/>}
        </TableCell>
        <TableCell>{ports.map(it => `${it.protocol}: ${it.number}\n`)}</TableCell>
        <TableCell><Link href={link}>{link}</Link></TableCell>
        <TableCell>
            <Button variant="contained" style={{margin: "0 8px"}} disabled={true}>Envs</Button>
            <Button variant="contained" style={{margin: "0 8px"}} disabled={true}>Logs</Button>
        </TableCell>
    </TableRow>
};