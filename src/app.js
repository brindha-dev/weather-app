//Core node modules
const path = require('path');

//npm node modules
const hbs = require('hbs');
const express = require('express');
const app = express();

//PORT
const port = process.env.PORT || 3000;

//custom modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsDir)
hbs.registerPartials(partialsDir, console.log('Partials file loaded'));

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        source: 'WeatherStack',
        name: 'Brindha Sambath'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        source: 'WeatherStack',
        name: 'Brindha Sambath'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        source: 'WeatherStack',
        name: 'Brindha Sambath',
        message: 'Provide location to get weather report.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Addresss should be provided for getting weather forecast'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        });
    });
})

//Error Handlers
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        source: 'WeatherStack',
        name: 'Brindha Sambath',
        errorMessage: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        source: 'WeatherStack',
        name: 'Brindha Sambath',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and listening in port ' + port)
})