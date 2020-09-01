const request = require('request')
const log = console.log

const accessKey = '7ba3e90f997f0d7fdd7cd4c6b51e664f'
const endPoint = 'http://api.weatherstack.com/current?access_key='

const forecast = (lati, long, callback) => {
    request({
        url: endPoint + accessKey + '&query=' + lati + ',' + long,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weatherstack.com', null)
        } else if (body.error) {
            callback('Your API request failed. Please try again or contact support.', null)
        } else {
            callback(null, body)
        }
    })
}

module.exports = {
    forecast
}