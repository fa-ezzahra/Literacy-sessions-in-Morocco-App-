const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection

/* GET ajouteruser page. */
router.get('/', (req, res) => {
  res.render('ajouteruser', { title: 'Express', messages: req.flash() });
});



  router.post('/adduser', (req, res) => {
    const { username, password } = req.body;
  
    // Validate that username and password are provided
    if (!username || !password) {
      req.flash('error', 'Please provide both username and password');
      return res.redirect('/ajouteruser');
    }
  
    const user = { nom_user: username, password: password };
  
    const sql = 'INSERT INTO user SET ?';
    req.db.query(sql, user, (err, result) => {
      if (err) {
        console.error('Error inserting into user:', err);
        req.flash('error', 'Failed to save user data!');
        return res.redirect('/ajouteruser');
      }
      req.flash('success', 'User data saved successfully!');
      res.redirect('/ajouteruser');
    });
  });
  

module.exports = router;
