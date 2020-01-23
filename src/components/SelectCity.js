import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
require('react-dom');

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: 8,
        marginBottom: 8,
        width: "100%",
        minWidth: 120,
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



function SelectCity(props) {
    const [city, setCity] =  React.useState("");
    // console.log(props.data)
    // const cityProp = props;
    // console.log(cityProp)
    let content = []
    for(var index in cities){
        content.push(
            <option value={cities[index].city} key={index}>{cities[index].city}</option>
    )
    }
    return (
        <form>
            <h2>Choose a city</h2>
            <select onChange={setCity(city)} id="select_city">
                <option></option>
                {content}
            </select>
        </form>

    );
}
export default SelectCity