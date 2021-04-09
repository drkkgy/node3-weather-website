const request = require('postman-request')
const chalk = require('chalk')


const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZHJra2d5IiwiYSI6ImNrbWRibDBydDBsN24ycm44NWJzcW1veTYifQ.39m-yyzwVneNOp1mdkHOFQ&limit=1'

    request({url,json:true}, (error,{body})=> {

        if(error){
            callback(chalk.red('Unable to connect to location service please check your network access !', undefined))
        } else if (body.features.length === 0) {
            callback(chalk.red("Unable to process your search please try again with another search term"),undefined)

        }else {

            callback(undefined,{

                 latitude: body.features[0].center[0],
                 Longitude: body.features[0].center[1],
                 location: body.features[0].place_name
                })
        }

    })

}

module.exports = geocode