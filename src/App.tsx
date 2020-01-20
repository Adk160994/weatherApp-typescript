import React, {Component, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import NavBar from "./components/NavBar";
import Tab from "./components/Tab";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

class app extends Component{
    componentDidMount(): void {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Bucharest,ro&units=metric&APPID=04732e001ee43c2618c3a93eb62a70f9')
            .then((response) => {
                let result = response.data.list
                let new_result = result.map(function (item: any) {
                    var main = item.main
                    var weather = item.main
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
                console.log(new_result)
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
                    loading:false
                })
                console.log(this.state);
            }) .catch(error =>{
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
                    <Tab data={this.state} key ={'tabs'}/>
                </Container>
            </React.Fragment>
        );
    }
}

// const App: React.FC = () => {
//
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo"/>
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }

export default app;
