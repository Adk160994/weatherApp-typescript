import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable(prop) {
    const classes = useStyles();
    let hours = prop.data
    let content = []
    if (hours === null) {
        console.log("no data found");
        content = []
    } else {
        for (var index in hours){
            content.push(
                <Grid container>
                    <Grid item xs={4}>
                        <p>{hours[index].data.slice(11,16)}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>{hours[index].main.temp_min+"° /"+ hours[index].main.temp_max+"°"}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>{hours[index].main.feels_like+"°"}</p>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <Grid container>
            <Grid item xs={4}>
                <p><b>Hour</b></p>
            </Grid>
            <Grid item xs={4}>
                <p><b>Temperature</b></p>
            </Grid>
            <Grid item xs={4}>
                <p><b>Feels Like</b></p>
            </Grid>
            {content}
        </Grid>
    );
}
