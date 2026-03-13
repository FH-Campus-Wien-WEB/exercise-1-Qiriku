const express = require('express')
const path = require('path')
const app = express()

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

app.get('/movies', async function (req, res) {
 let movies = [];
  
  movies.push(await getMovie('Avatar'));
  movies.push(await getMovie('Cars'));
  movies.push(await getMovie('Avengers'));

  res.send(movies);
})

async function getMovie(movieName){
  // I know I shouldn't be pushing apikeys but idc about this one
  url = "https://www.omdbapi.com/?t=" + movieName + "&apikey=70592b79";
  const response = await fetch(url);
  const data = await response.json();

  const {Title,Plot,Poster} = data;
  
  // 2011-10-05T14:48:00.000Z -> split at T and take the first part to get just the date
  const Released = new Date(data.Released).toISOString().split('T')[0];

  // Runtime is in the format "162 min", so split at the space and take the first part to get just the number
  const Runtime = Number(data.Runtime.split(' ')[0]);
  Genres = data.Genre.split(',');
  Directors = data.Director.split(',');
  Writers = data.Writer.split(',');
  Actors = data.Actors.split(',');
  Metascore = Number(data.Metascore);
  imdbRating = Number(data.imdbRating)

  const movie = {Title,Released,Runtime,Genres,Directors,Writers,Actors,Plot,Poster,Metascore,imdbRating};
  return movie;
}

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

