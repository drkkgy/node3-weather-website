const request = require('postman-request')
//




const forecast = (latitude,Longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=d0ee332c2c252745aaab07cd259d7b05&query='+ Longitude + ',' + latitude + '&units=f'

    request({url,json:true},(error,{body}) => {

        if(error){
            callback("Unable to connect to Weather Service",undefined)
        } 
        else if (body.error){
            callback(body.error.info,undefined)
        }
        else{
            callback(undefined,"The Description of weather is "+body.current.weather_descriptions[0] +". The Temperature today is: "+ body.current.temperature + " degress and it feels like : " + body.current.feelslike + " degress" + 
            " Todays humidity is :" + body.current.humidity + "%" +" And the cloud cover is :" + body.current.cloudcover + "%")
        }


    })

}

module.exports = forecast
