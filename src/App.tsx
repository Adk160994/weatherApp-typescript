import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import NavBar from "./components/NavBar";
import Tab from "./components/Tab";
import SelectCity from "./components/SelectCity";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

// var e = document.getElementById('select_city');
// console.log(e.options[e.selectedIndex].value)


class app extends Component{
    componentDidMount(): void {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Bucharest,ro&units=metric&APPID=04732e001ee43c2618c3a93eb62a70f9')
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
                this.setState({
                    days : groupArrays,
                    name : '',
                    loading:false
                })
                console.log(this.state)
            }).catch(error =>{
            console.log('Error fetching and parsing data',error)
        })
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <CssBaseline />
                <Container maxWidth="sm">
                    {/*<CityCard data={this.state} key={'city'}/>*/}
                    <SelectCity />
                    <Tab data={this.state} key ={'tabs'}/>
                </Container>
            </React.Fragment>
        );
    }
}

export default app;
