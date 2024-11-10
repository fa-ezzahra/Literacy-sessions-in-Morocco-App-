const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection



// GET messagerie page
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM comment';
  console.log("chi hzja");
  req.db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching comments from database:', err);
      return res.status(500).send('Error fetching comments from database');
    }
    res.render('messagerie', { title: 'Messagerie', comments: results });
  });
});

module.exports = router;
