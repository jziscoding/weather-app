const request = require('request')
const log = console.log

const accessKey = 'pk.eyJ1IjoianpqeiIsImEiOiJja2U1eDI5MW4xN2h5MndwdWp2N2tjZ3Z1In0.-ypRI36vBy5KDY_uFetqew'
const endPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (location, callback) => {
    request({
        url: endPoint + encodeURIComponent(location) + '.json?access_token=' + accessKey + '&limit=1',
        json: true
    }, (error, {body}) => {
        // log('debug', endPoint + encodeURIComponent(location) + '.json?access_token=' + accessKey + + '&limit=1')
        if (error) {
            callback('Unable to connect to Mapbox.com', {})
        } else if (body.features.length === 0) {
            callback('Location not found', {})
        } else {
            callback('', body.features[0].center)
        }
    })
}

module.exports = {
    geocode
}