const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const helmet  = require('helmet');
const MOVIES  = require('./movies');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

/// auth

app.get('/movie', (req, res) => {

  let search = null;
  let type = null;

  if (req.query.type && ['genre', 'country', 'avg_vote'].includes(req.query.type.toLowerCase())) {
    type = req.query.type.toLowerCase();
  }

  if (req.query.search) {
    search = req.query.search;
  }


  if (search && type) {

    let filtered = [];

    if (type === 'genre') {

      filtered = MOVIES.filter((m) => {
        return m.genre.toLowerCase().includes(search.toLowerCase());
      });

      return res.json(filtered);
    }

    if (type === 'country') {

      filtered = MOVIES.filter((m) => {

        return m.country.toLowerCase().includes(search.toLowerCase());
      });

      return res.json(filtered);
    }

    if (type === 'avg_vote') {

      filtered = MOVIES.filter((m) => {

        return m.avg_vote >= Number.parseInt(search, 10);
      });

      return res.json(filtered);
    }
  }

  res.json(MOVIES);
});



app.listen(8000, () => {
  console.log('app listening on port 8000');
});
