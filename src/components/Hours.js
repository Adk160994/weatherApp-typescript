import React from 'react';
import thunderstorm from '../images/Thunderstorm.png'
import drizzle from '../images/Drizzle.png'
import rain from '../images/Rain.png'
import snow from '../images/Snow.png'
import atmosphere from '../images/Atmosphere.png'
import clear from '../images/Clear.png'
import clouds from '../images/Cloudy.png'
import extreme from '../images/Extreme.png'
import defaultIcon from '../images/Partly-cloudy.png'
import Grid from "@material-ui/core/Grid";

export default function SimpleTable(prop) {
    let hours = prop.data
    let content = []
    if (hours === null) {
        console.log("no data found");
        content = []
    } else {
        for (var index in hours){
            var weather = hours[index].weather[0].main
            let weatherIcon
            switch(weather) {
                case 'Thunderstorm':
                    weatherIcon = thunderstorm
                    break
                case 'Drizzle':
                    weatherIcon = drizzle
                    break
                case 'Rain':
                    weatherIcon = rain
                    break
                case 'Snow':
                    weatherIcon = snow
                    break
                case 'Atmosphere':
                    weatherIcon = atmosphere
                    break
                case 'Clear':
                    weatherIcon = clear
                    break
                case 'Clouds':
                    weatherIcon = clouds
                    break
                case 'Extreme':
                    weatherIcon = extreme
                    break
                default:
                    weatherIcon = defaultIcon
            }
            content.push(
                <Grid container key={index}>
                    <Grid item xs={4}>
                        <p>{hours[index].data.slice(11,16)}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={`${weatherIcon}`} alt="WeatherIcon" height="40" width="40" />
                    </Grid>
                    <Grid item xs={4}>
                        <p>{hours[index].main.temp_min+"° / "+ hours[index].main.temp_max+"°"}</p>
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

            </Grid>
            <Grid item xs={4}>
                <p><b>Temperature</b></p>
            </Grid>
            {content}
        </Grid>
    );
}
