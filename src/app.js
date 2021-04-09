const hbs = require('hbs')
const path = require('path')
const express = require('express')
const chalk = require('chalk')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')


console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))


// Define path for express congfig 
const public_directory_path = path.join(__dirname,'../public')
const views_Path = path.join(__dirname,'../templates/views')
const partials_Path = path.join(__dirname,'../templates/partials')

//const port = 3000 // While deploying 
const port  = process.env.PORT || 3000  // Required for the deployed environment as port values keep changing
const app = express()


// Setup handelbars engine and views location
app.set('view engine','hbs') // to setup an dynamic engine 
app.set('views',views_Path) // Changing default views path to a custom path (Templates in this case) else if views folder in renamed the code will fail
hbs.registerPartials(partials_Path)

// Setup Static Directory to server
app.use(express.static(public_directory_path))

app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather',
        name: 'Ankit Yadav'
    })
})

app.get('/about',(req,res)=> {

    res.render('about',{
        title:'About Me',
        name: 'Ankit Yadav'
    })
})

app.get('/help',(req,res) =>{

    res.render('help',{
        title: 'HELP',
        name: 'Ankit Yadav',
        message: 'This is an sample message'

    })
})

// Hence we can call all the different html files from their name after the ip is the path us set into app.use

app.get('/weather',(req,res)=> {

    if(!req.query.address){
        return res.send ({
            error: 'You Must Provide a Address to serach weather'
        })
    }

    geocode(req.query.address,(error,{latitude,Longitude,location} = {})=>
    {
        if(error) {
            return res.send({
                error: error
            })
        }-
        forecast(latitude,Longitude, (error,forecastdata)=>{

            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forcast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })


})


app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({
            error: 'You Must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})




app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'Help not found',
        name: 'Ankit Yadav',
        error: 'Help Article not found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name: 'Ankit Yadav',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server Started at port:" + String(port) )
})




//***** to enable nodemon to restart when other files apart from js files are changed add a -e flag followed by values of extensions seprated by commas 
// eg nodemon app.js -e js,hbs

// Here we remove the root path as the app.use(express.static(public_directory_path)) detects the file in the given path with the name of index.html automatically

// const path = require('path')
// const express = require('express')
// const chalk = require('chalk')


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

// const public_directory_path = path.join(__dirname,'../public')




// const port = 3000
// const app = express()

// app.use(express.static(public_directory_path))

// app.get('',(req,res)=>{

//     res.send('<h1><b>Hello Express !!</b></h1>')
// })

// app.get('/help', (req,res)=>{

//     res.send([{heading:"<h1><b>Help Page</b></h1>"
//                 ,
//             age:24},{name:'Ankit'}])

// })

// app.get('/about',(req,res) =>{
//     res.send("<h1><b>ABOUT</b></h1>")
// })

// app.get('/weather',(req,res)=> {
//     res.send(file)
// })


// app.listen(port, () => {
//     console.log("Server Started at port:" + String(port) )
// })


