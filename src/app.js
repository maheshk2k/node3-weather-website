const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlbar views engine and views path
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Mahesh'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Rahul',
        title: 'About Us'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        help_message: 'Dial 1111111 when you need our support',
        name: 'Parth'
    })
})

app.get('/weather', (req, res)=>{

    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide address'
        })
    }
    let forecastJSON = {}
    geocode.geocode(address, (error, {latitude, longitude, location} ={} )=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            forecastJSON = {
                location,
                forecastData,
                address
            }
            console.log(forecastJSON)
            return res.send(forecastJSON)
        })
        
    })
})

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        message: 'Help article not found',
        name: 'Mahesh'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        message:'Page not found',
        name: 'Mahesh'
    })
})



app.listen(port,()=>{
    console.group('Server is up on port' + port)
})