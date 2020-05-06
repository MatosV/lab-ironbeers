const express = require('express');

const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
  /* punkAPI
    .getBeers(beersFromApi)
    .then(beer => {
      const data = beer.data;
      const beerSearch = data.Search;
      res.render('beers', { beerSearch });
    })
    .catch(error => {
      console.log('Error loading response from api');
      console.log(error);
    });*/
});

app.get('/random-beers', (req, res) => {
  punkAPI
  .getBeers();
    const randomBeer = punkAPI.getRandom();
    randomBeer.then(beer => {
        console.log(beer);
        res.render('random-beers', { beer });
      })
      .catch(error => {
        console.log(error);
      });
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeers(id)
    const beers1 = punkAPI.getBeer(1)    
      beers1.then(beerId => {
        console.log('cold one just for you');
        res.render('clickable', { beerId });
      })
      .catch(error => {
        console.log(error);
      });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
