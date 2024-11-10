const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection



router.get('/', (req, res) => {
  const queries = {
    enseignants: 'SELECT * FROM enseignant',
    centres: 'SELECT * FROM centre',
    eleves: 'SELECT * FROM eleve'
  };

  const data = {};

  const getData = (query, key) => {
    return new Promise((resolve, reject) => {
      req.db.query(query, (err, results) => {
        if (err) return reject(err);
        data[key] = results;
        resolve();
      });
    });
  };

  Promise.all([
    getData(queries.enseignants, 'enseignants'),
    getData(queries.centres, 'centres'),
    getData(queries.eleves, 'eleves')
  ])
    .then(() => {
      res.render('pagegroupe', data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
