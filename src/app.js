const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsDir)

hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    const location = req.query.address
    if (!location) {
        return res.send({
            error: 'You need to provide an address.'
        })
    }
    
    geocode.geocode(location, (geoError, center) => {
        if (geoError) {
            // console.log(geoError)
            return res.send({
                error: geoError
            })
        }
        forecast.forecast(center[1], center[0], (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                location: forecastData.location,
                current: forecastData.current
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        errorMsg: 'Help content does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        errorMsg: 'Requested page does not exist'
    })
})

app.listen(80, () => {
    console.log('Server is up.')
})