var express = require('express');
var exphbs = require('express-handlebars');
var omdb = require('omdb-node-wrapper');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res) {
  // Replace Alien with a req param (or path param)
  omdb.getMovieByTitle('Alien', {}, function(data) {
    var parsedData = JSON.parse(data);
    // Get full res poster
    parsedData.Poster = parsedData.Poster.slice(0, -7) + '1400.jpg';

    parsedData.Writer = parsedData.Writer.split(',');
    parsedData.Actors = parsedData.Actors.split(',');

    res.render('home', {
      layout: false,
      movies: ['Alien', 'Gone Girl', 'Blade Runner', 'Scream', 'Sicario'],
      movie: parsedData
    });
  });
});

app.listen(3000);