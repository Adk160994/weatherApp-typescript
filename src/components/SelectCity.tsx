import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

require('react-dom');

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        marginTop: 20,
        borderColor: 'white',

    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const cities = [
    {
        country: "Romania",
        city: "Bucharest"
    },
    {
        country: "England",
        city: "London"
    },
    {
        country: "Russian Federation",
        city: "Moscow"
    }
];


function SelectCity(props: any) {
    const content = [];
    for (var index in cities) {
        content.push(
            <MenuItem value={cities[index].city} key={index}>{cities[index].city}</MenuItem>
        )
    }

    const classes = useStyles();
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Choose a city
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                onChange={(event) => props.onChange(event.target.value)}
                value={props.value}
                defaultValue=""
                labelWidth={labelWidth}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {content}
            </Select>
        </FormControl>
    );
}

export default SelectCity
