import React, {Component, useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import NavBar from "./components/NavBar";
import Tab from "./components/Tab";
import SelectCity from "./components/SelectCity";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

class app extends Component {
    const [cityName, setCityName] = useState("");
    const [days, setDays] = useState([]);

    const handleChange = (city:string) => {
        console.log(city);
        if('name' in city) {
            setCityName(city.name);
        }
    };

    useEffect(() = {
        let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&APPID=04732e001ee43c2618c3a93eb62a70f9"
        console.log("Apiurl"+apiUrl)

        axios.get(apiUrl)
            .then((response) => {
                let result = response.data.list
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
                    return date
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
                setDays(groupArrays);
                console.log(this.state)
            }).catch(error =>{
                console.log('Error fetching and parsing data',error)
            });
    });

    constructor(prop:any) {
        super(prop);
    }

    render() {

        return (
            <React.Fragment>
                <NavBar />
                <CssBaseline />
                <Container maxWidth="sm">
                    <SelectCity onChange={this.handleChange} key ={'selectcity'}/>
                    <Tab data={days} key={'tabs'}/>
                </Container>
            </React.Fragment>
        );
    }
}

export default app;
