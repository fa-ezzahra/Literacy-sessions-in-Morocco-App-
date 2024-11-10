const express = require('express');
const router = express.Router();
const db = require('../database'); // Import the database connection

/* GET pageprincipale page. */
router.get('/', (req, res) => {
  res.render('pageprincipale', { title: 'Express', messages: {} });
});

// Route to handle form submission for 'submit-comment'
router.post('/submit-comment', (req, res) => {
  const { nom, prenom, ville, comment } = req.body;
  const sql = 'INSERT INTO comment (nom, prenom, ville, comment) VALUES (?, ?, ?, ?)';
  db.query(sql, [nom, prenom, ville, comment], (err, result) => {
    if (err) {
      console.error('Error inserting into comment:', err);
      return res.render('pageprincipale', { messages: { error: 'Failed to save comment!' } });
    }
    res.render('pageprincipale', { messages: { success: 'Comment added successfully!' } });
  });
});

// Route to handle form submission for 'submit-user'
router.post('/submit-user', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user WHERE nom_user = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.render('pageprincipale', { messages: { error: 'Error checking user credentials!' } });
    }
    if (results.length > 0) {
      // User exists, redirect to index.ejs
      res.render('index', { title: 'Welcome', messages: { success: 'Login successful!' } });
    } else {
      // User does not exist, show error message with entered username and password
      res.render('pageprincipale', { 
        messages: { 
          error: `Invalid username or password! Entered Username: ${username}, Entered Password: ${password}` 
        },
        username, // Pass the username to the template for potential further use
        password  // Pass the password to the template for potential further use
      });
    }
  });
});



router.get('/centres', (req, res) => {
  const sql = 'SELECT nom_centre FROM centre';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching centres:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

// Route to get groups and students based on the selected centre
router.get('/groups/:centre', (req, res) => {
  const { centre } = req.params;
  const sql = `
    SELECT g.num_groupe, e.nom_eleve, e.prenom_eleve
    FROM groupe g
    JOIN eleve e ON g.id_groupe = e.id_groupe
    JOIN centre c ON g.id_centre = c.id_centre
    WHERE c.nom_centre = ?
  `;
  db.query(sql, [centre], (err, results) => {
    if (err) {
      console.error('Error fetching groups and students:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});


/*function generateTimetable(n) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>beobe");
  if (n % 2 !== 0) {
    throw new Error("Parameter must be an even number.");
  }
  
  const mathClassrooms = [];
  const ArabClassrooms = [];

  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      ArabClassrooms.push(i);
    } else {
      mathClassrooms.push(i);
      }
  }

  const openingHours = [
    { day: "lundi", hours: ["09:00", "2:00", "6:00"] },
    { day: "mercredi", hours: ["09:00", "2:00", "6:00"] },
    { day: "vendredi", hours: ["09:00", "2:00", "6:00"] }
  ];

  const numberOfGroups = Math.min(mathClassrooms.length, ArabClassrooms.length) * 3;
  const groups = Array.from({ length: numberOfGroups }, (_, i) => `G${i + 1}`);
  
  const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

  const schedule = [];
  
  groups.forEach(group => {
    const days = openingHours.map(oh => oh.day);
    const firstSessionDay = getRandomElement(days);
    let secondSessionDay;
    
    do {
      secondSessionDay = getRandomElement(days);
      } while (Math.abs(days.indexOf(firstSessionDay) - days.indexOf(secondSessionDay)) <= 1);
      
      const firstSessionTime = getRandomElement(openingHours.find(oh => oh.day === firstSessionDay).hours);
    const secondSessionTime = getRandomElement(openingHours.find(oh => oh.day === secondSessionDay).hours);

    const subjects = ["Math", "Arab"];
    const firstSessionSubject = getRandomElement(subjects);
    const secondSessionSubject = firstSessionSubject === "Math" ? "Arab" : "Math";
    
    const firstSessionClassroom = getRandomElement(firstSessionSubject === "Math" ? mathClassrooms : ArabClassrooms);
    const secondSessionClassroom = getRandomElement(secondSessionSubject === "Math" ? mathClassrooms : ArabClassrooms);

    schedule.push({
      group,
      day: firstSessionDay,
      time: firstSessionTime,
      subject: firstSessionSubject,
      classroom: firstSessionClassroom
      });
      
      schedule.push({
      group,
      day: secondSessionDay,
      time: secondSessionTime,
      subject: secondSessionSubject,
      classroom: secondSessionClassroom
      });
      });
      
      console.log(schedule);
      return schedule;
}*/

// Define the route handler
/*router.get('/timetable/:centre', (req, res) => {
  const { centre } = req.params;
  const sql = `
  SELECT c.nb_salles
  FROM centre c
  WHERE c.nom_centre = ?
  `;
  db.query(sql, [centre], (err, results) => {
    if (err) {
      console.error('Error fetching number of rooms:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Centre not found');
    }

    const nbSalles = results[0].nb_salles;

    try {
      const timetable = generateTimetable(nbSalles);
      res.json(timetable);
      } catch (error) {
        console.error('Error generating timetable:', error);
        res.status(400).send(error.message);
   }
});
});*/



        
        
        
        
        
        


        
 module.exports = router;
