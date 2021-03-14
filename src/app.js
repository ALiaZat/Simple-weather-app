const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { rejects } = require('assert');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to Home!',
        body: 'This is my express web app!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Welcome to About!'
    });
});


app.get('/books/:cat', (req, res) => {

    if (!req.query.id) {
        return res.send({
            error: 'Id is not provided!'
        })
    }
    
    console.log(req.params);

    res.send({books: [
        {id: 321, name: 'I like Math', cat: 'Math'}
    ]})
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'ahmad',
//         email: 'ahamd@example.com'
//     },
//     {
//         name: 'ahmads',
//         email: 'ahamds@example.com'
//     }]);
// });

app.get('*', (req, res) => {
    res.render('404-error', {
        title: '404 error',
        message: 'Page not found!'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});