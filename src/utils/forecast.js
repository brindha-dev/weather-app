const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=b247072684814f2588bc2b97056b1931&query=' + latitude + ',' + longitude;

    // request({ url: url, json: true }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to forecast services', undefined);
    //     }

    //     const string = response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. But feels like " + response.body.current.feelslike + " degrees";
    //     callback(undefined, string)
    // })
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services', undefined);
        }

        const string = response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. But feels like " + response.body.current.feelslike + " degrees";
        callback(undefined, string)
    })
}

module.exports= forecast;
