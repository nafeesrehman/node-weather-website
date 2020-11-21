const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Nafees' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nafees'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'You can find help here',
        title: 'Help',
        name: 'Nafees'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
		if(error) {
            return res.send({
                error: error
            })
		}
	   
	   forecast(longitude, latitude, (error, forecasrData) => {
		   if(error) {
            return res.send({
                error: error
            }) 
		   }
           res.send({
            Temp: location,
            Condition: forecasrData,
            address: req.query.address
        })
		 })
    })
    
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Nafees'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Nafees'
    })
})

app.listen(port, ()=> {
    console.log('Server Started on port ' + port)
})