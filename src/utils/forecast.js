const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=e57cd41b7bb549ee5b4b106887863968&query='+latitude+','+longitude+'&units=m'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, 'Currently it is '+ body.current.temperature)
        }
    })

}

module.exports = {
    forecast:forecast,

}