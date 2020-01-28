import React, {useState} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import Tab from "./components/Tab";
import SelectCity from "./components/SelectCity";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import GetWeather from "./components/getData";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiAppBar: {
            // Name of the rule
            colorPrimary: {
                // Some CSS
                background: 'linear-gradient(45deg, #2C3E50 30%, #FD746C 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
            },
        },
        MuiCssBaseline: {
            '@global': {
                body: {
                    background: 'linear-gradient(45deg, #2C3E50 30%, #FD746C 90%)',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "auto",
                    height: '150vh',
                }
            }
        },
        MuiSelect: {
            icon: {
                color: 'white',
            }
        },
        MuiOutlinedInput: {
            root: {
                borderColor: 'white',
            }
        },
        MuiInputBase: {
            root: {
                color: 'white',
            },
            input: {
                color: 'white',
                borderColor: 'white',
            }
        },
        MuiFormLabel: {
            root: {
                color: 'white',
            }
        },
    },
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            light: '#ffffff',
            dark: '#9a0036',
            main: '#ffffff',
            contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});


const App = () => {
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState();

    const handleChange = (newCity: any) => {
        if (newCity !== cityName) {
            if (newCity === '') {
                setCityName(newCity);
            } else {
                GetWeather(newCity)
                    .then((cityWeather) => {
                        const newWeather = weather ? weather : {};
                        newWeather[newCity] = cityWeather;
                        setCityName(newCity);
                        setWeather(newWeather);
                    });
            }
        }
    };

    const data = weather && cityName in weather ? weather[cityName] : [];

    return (
        <React.Fragment>
            <ThemeProvider theme = {theme}>
                <CssBaseline/>
                <NavBar/>
                <Container>
                    <SelectCity onChange={handleChange} key={'selectcity'}/> <br/>
                    <Tab data={data} key={'tabs'}/>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
