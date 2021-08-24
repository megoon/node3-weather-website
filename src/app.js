const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs');
//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Setup handlerbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dirtectory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Megoon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Megoon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Megoon',
        helpText: 'This is a handfull of help text'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send('Please enter your address')
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })

        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Megoon',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Megoon',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})