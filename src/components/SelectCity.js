import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

function SelectCity() {
    //initial value set to react
    const [city,setCity] = useState('');

    function handleChange(e){
        setCity(e.target.value);
        e.name = e.target.value
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(city);
    };

    let content = []
    for(var index in cities){
        content.push(
            <option value={cities[index].city}>{cities[index].city}</option>
        )
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Choose a city</h2>
            <select onChange={handleChange} value={city} id="select_city">
                <option></option>
                {content}
            </select>
            <button type="submit">Submit</button>
        </form>

    );
}
export default SelectCity