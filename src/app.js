const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const app = express();
const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// get the weather api :)
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.5326&lon=35.0998&appid=b79529712f1c0691e6afae708aff98b8';
let weatherData;
request(url, function(error, response) {
    console.log('error:', error); 
    weatherData = JSON.parse(response.body);
});

app.use(express.static('Images'));

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/' , (req, res) => {
    res.render('home')
});

app.get('/about' , (req, res) => {
    res.render('about')
});

app.get('/weather' , (req, res) => {
    res.render('weather', {
        temp: Math.round(weatherData.main.temp - 273.15),
        desc: weatherData.weather[0].description,
    });
});
app.get('*', (req, res) => {
    res.render('404-error', {
        title: '404 error',
        message: 'Page not found!'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});