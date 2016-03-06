var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var omdb = require('omdb-node-wrapper');
var app = express();


this.movieList = [];

// Read list of line separated movies from movies.txt
fs.readFile('movies.txt', 'utf-8', (err, data) => {
  if (err) { throw err; }
  var lines = data.split('\n');
  lines.pop();
  this.movieList = lines;
});

var hbs = exphbs.create({
  helpers: {
    generateMovieUrl: title => 'http://localhost:3000/movie/' + title
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get('/', (req, res) => res.redirect('/movie/Alien'));

app.get('/movie/:title', (req, res) => {
  omdb.getMovieByTitle(decodeURI(req.params.title), {}, data => {
    var parsedData = JSON.parse(data);
    // Get full res poster
    parsedData.Poster = parsedData.Poster.slice(0, -7) + '1400.jpg';
    parsedData.Writer = parsedData.Writer.split(',');
    parsedData.Actors = parsedData.Actors.split(',');

    res.render('home', {
      layout: false,
      movies: this.movieList,
      movie: parsedData
    });
  });
});

app.listen(3000);