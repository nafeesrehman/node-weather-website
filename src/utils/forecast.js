const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'https://community-open-weather-map.p.rapidapi.com/weather?rapidapi-key=c2abb8fba3msh7927b5b5390cdd5p185ef1jsne79e10cbddad&units=metric&lon='+ lon +'&lat='+ lat +''
    
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.cod === '400') {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.weather[0].description + ' It is currently ' + body.main.temp + ' degress out. There is a ' + body.weather[0].main + '% chance of rain.')
           // console.log(response.body.weather[0].description + ' It is currently ' + response.body.main.temp + ' degress out. There is a ' + response.body.weather[0].main + '% chance of rain.')	
        }
    })
}

module.exports = forecast
