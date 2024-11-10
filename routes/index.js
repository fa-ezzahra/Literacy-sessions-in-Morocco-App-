const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection

// GET home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Express', messages: req.flash() });
});

// Route to handle form submission for 'prof'
router.post('/prof', (req, res) => {
  const { nom, prenom, matiere, ville } = req.body;
  const sql = 'INSERT INTO enseignant (nom_ens, prenom_ens, matiere, ville_ens, id_centre) VALUES (?, ?, ?, ?, 0)';
  db.query(sql, [nom, prenom, matiere, ville], (err, result) => {
    if (err) {
      console.error('Error inserting into enseignant:', err);
      req.flash('error', 'Failed to save prof data!');
      return res.redirect('/index');
    }
    req.flash('success', 'Prof data saved successfully!');
    res.redirect('/index');
  });
});

// Route to handle form submission for 'centre'
router.post('/centre', (req, res) => {
  const { nom_centre, ville_centre, nb_salles } = req.body;
  const sql = 'INSERT INTO centre (nom_centre, ville_centre, nb_salles) VALUES (?, ?, ?)';
  db.query(sql, [nom_centre, ville_centre, nb_salles], (err, result) => {
    if (err) {
      console.error('Error inserting into centre:', err);
      req.flash('error', 'Failed to save centre data!');
      return res.redirect('/index');
    }
    req.flash('success', 'Centre data saved successfully!');
    res.redirect('/index');
  });
});

router.post('/groupe', (req, res) => {
  const { numero_groupe, nombre_eleve, id_centre } = req.body;

  // Validate that the inputs are integers
  const isNumeroGroupeInt = Number.isInteger(Number(numero_groupe));
  const isNombreEleveInt = Number.isInteger(Number(nombre_eleve));
  const isIdCentreInt = Number.isInteger(Number(id_centre));

  if (!isNumeroGroupeInt || !isNombreEleveInt || !isIdCentreInt) {
    req.flash('error', 'All fields must be integers!');
    return res.redirect('/index');
  }

  const sql = 'INSERT INTO groupe (num_groupe, nbeleve, id_centre) VALUES (?, ?, ?)';
  db.query(sql, [numero_groupe, nombre_eleve, id_centre], (err, result) => {
    if (err) {
      console.error('Error inserting into groupe:', err);
      req.flash('error', 'Failed to save group data!');
      return res.redirect('/index');
    }
    req.flash('success', 'Group data saved successfully!');
    res.redirect('/index');
  });
});


// Route to handle form submission for 'eleve'
router.post('/eleve', (req, res) => {
  const { nom_eleve, prenom_eleve, id_groupe, id_centre } = req.body;
  const sql = 'INSERT INTO eleve (nom_eleve, prenom_eleve, id_groupe, id_centre) VALUES (?, ?, ?, ?)';
  db.query(sql, [nom_eleve, prenom_eleve, id_groupe, id_centre], (err, result) => {
    if (err) {
      console.error('Error inserting into eleve:', err);
      req.flash('error', 'Failed to save eleve data!');
      return res.redirect('/index');
    }
    req.flash('success', 'Eleve data saved successfully!');
    res.redirect('/index');
  });
});

module.exports = router;
