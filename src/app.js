const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;

const geocode = require('./utls/geocode.js');

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
  res.render('index', { title: 'Weather app', name: 'Burton' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About me', name: 'Burton' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Burton' });
});

app.get('/weather', (req, res) => {
  const { query } = req;
  if (!query.address) {
    return res.send({ error: 'You must provide an address.' });
  }

  geocode.getWeatherCondition(query.address).then((data) => {
    if (data.error) {
      return res.send(data);
    }

    res.send({
      forcast: data.forcast,
      location: data.location,
      address: data.city,
    });
  });
});

app.get('/products', (req, res) => {
  const { query } = req;
  if (!query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    message: 'Help article not found',
    title: 404,
    name: 'Burton',
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    message: 'Page not found',
    title: 404,
    name: 'Burton',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
