const request = require('request');

const geocode = function (address, callback) {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnJpbmRoYXNhbWJhdGgiLCJhIjoiY2tmMjU4N3FxMWFsNzJzcGhubXE5cnJxcyJ9.-s9dn5Wlz85TU3SOogg1cQ&limit=1';

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;