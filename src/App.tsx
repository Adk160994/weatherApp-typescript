import React, {useState} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import Tab from "./components/Tab";
import SelectCity from "./components/SelectCity";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

function updateApiUrl(city: any) {
    return "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=04732e001ee43c2618c3a93eb62a70f9";
}

const App = () => {
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState();

    const handleChange = (newCity: any) => {
        if (newCity !== cityName) {
            if(newCity === '') {
                setCityName(newCity);
            } else {
                getWeather(newCity)
                    .then((cityWeather) => {
                        const newWeather = weather ? weather : {};
                        newWeather[newCity] = cityWeather;
                        setCityName(newCity);
                        setWeather(newWeather);
                    });
            }
        }
    };

    const getWeather = (cityName: string) => {
        return fetch(updateApiUrl(cityName))
            .then((response) => response.json())
            .then((data) => {
                let result = data.list;
                let new_result = result.map(function (item: any) {
                    var main = item.main
                    var weather = item.weather
                    var myDate = new Date(item.dt * 1000)
                    var data = myDate.toISOString()
                    var date = {
                        data: data,
                        data_txt: myDate,
                        main: main,
                        weather: weather,
                    }
                    return date;
                })
                const groups = new_result.reduce((groups: any, dayWeather: any) => {
                    const date = dayWeather.data.split('T')[0];
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(dayWeather);
                    return groups;
                }, {});
                const groupArrays = Object.keys(groups).map((date) => {
                    return {
                        date,
                        dayWeather: groups[date]
                    };
                });
                return groupArrays;
            });

    }

    const data = weather && cityName in weather ? weather[cityName] : [];
    console.log("==============+");
    console.log(data);
    console.log("==============+");

    return (
        <React.Fragment>
            <NavBar/>
            <CssBaseline/>
            <Container maxWidth="sm">
                <SelectCity onChange={handleChange} key={'selectcity'}/>
                <Tab data={data} key={'tabs'}/>
            </Container>
        </React.Fragment>
    );
};

export default App;
