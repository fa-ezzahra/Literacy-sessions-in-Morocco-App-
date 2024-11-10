const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./database'); // Import the database connection

// Create Express app
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for sessions
app.use(session({
  secret: 'ABCDEFGH12345678',
  resave: false,
  saveUninitialized: true
}));

// Middleware for flash messages
app.use(flash());

// Make the MySQL connection accessible to the router
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Import routes
const indexRouter = require('./routes/index');
const messagerieRouter = require('./routes/messagerie');
const ajouteruserRouter = require('./routes/ajouteruser');
const pagegroupeRouter = require('./routes/pagegroupe');
const pagePrincipaleRouter = require('./routes/pageprincipale');

// Use routes
app.use('/ajouteruser', ajouteruserRouter);
app.use('/', pagePrincipaleRouter); 
app.use('/pagegroupe', pagegroupeRouter); 
app.use('/index', indexRouter); 
app.use('/messagerie', messagerieRouter);

// Start the server on port 3010
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
