const GetWeather = (cityName: string) => {
    const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&APPID=04732e001ee43c2618c3a93eb62a70f9";
    return fetch(apiUrl)
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
};

export default GetWeather;
