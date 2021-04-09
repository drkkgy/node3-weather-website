const request = require('postman-request')
const chalk = require('Chalk')




const forecast = (latitude,Longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=d0ee332c2c252745aaab07cd259d7b05&query='+ Longitude + ',' + latitude + '&units=f'

    request({url,json:true},(error,{body}) => {

        if(error){
            callback(chalk.red("Unable to connect to Weather Service",undefined))
        } 
        else if (body.error){
            callback(chalk.red(body.error.info),undefined)
        }
        else{
            callback(undefined,chalk.green("The Description of weather is "+body.current.weather_descriptions[0] +". The Temperature today is: "+ body.current.temperature + " degress and it feels like : " + body.current.feelslike + " degress"))
        }


    })

}

module.exports = forecast
