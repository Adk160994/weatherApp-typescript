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

export default function Tab(prop:any) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const result = prop.data;
    console.log("tab");
    console.log(result);
    console.log("tab");

    let content = [];
    let i = 0;
    if (result.length === 0) {
        console.log("no data found");
        content = []
    } else {
        for (var index in result) {
            i = i+1;
            content.push(
                <ExpansionPanel key={i} square expanded={expanded === 'panel'+i} onChange={handleChange('panel'+ i)}>
                    <ExpansionPanelSummary aria-controls="panel{i}d-content" id="panel{i}-header">
                        <Typography>{result[index].dayWeather[0].data_txt.toDateString().slice(0, 10)}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Hours key={i} data = {result[index].dayWeather} />
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
