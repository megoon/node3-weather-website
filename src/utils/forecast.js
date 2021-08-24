const axios = require('axios');


const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=58e07dce3861e45920d394e54d3c3b23&units=metric'

    axios.get(url)
        .then(response => {
            callback(undefined, 'Currently ' + response.data.main.temp + ' °C out there. This high today is ' + response.data.main.temp_max + ' with low of ' + response.data.main.temp_min + ' Feels like ' + response.data.weather[0].description + ' and Humidity is ' + response.data.main.humidity + '%')
        })
        .catch(error => {
            if (error.response) {
                callback(error.response.data.message, undefined);
            } else if (error) {
                callback('Unable to connect weather service.', undefined);
            }
        })
}


module.exports = forecast;