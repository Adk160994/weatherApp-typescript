import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Hours from "./Hours";


const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(prop) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const result = prop.data;

    let content = [];
    let i = 0;
    if (result === null) {
        console.log("no data found");
        content = []
    } else {
        for (var index in result.days) {
            i = i+1
            content.push(
                <ExpansionPanel key={i} square expanded={expanded === 'panel'+i} onChange={handleChange('panel'+ i)}>
                <ExpansionPanelSummary aria-controls="panel{i}d-content" id="panel{i}-header">
                        <Typography>{result.days[index].dayWeather[0].data_txt.toDateString().slice(0, 10)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Hours key={i} data = {result.days[index].dayWeather} />
                </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }
    }

    return (
        <div>
            {content}
        </div>
    );
}
