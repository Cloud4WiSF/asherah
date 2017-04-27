require('dotenv').config();

var express           = require('express');
var ParseServer       = require('parse-server').ParseServer;
var ParseDashboard    = require('parse-dashboard');
var path              = require('path');
var passport          = require('passport');
var TwitterStrategy   = require('passport-twitter').Strategy;
var expressSession    = require('express-session'); // needed for twitter: temporary secret is stored in the session to prevent cross site scripting attacks.

var databaseUri = process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_xz7n8dv2:c5aregj2ep3e4jcabj157tam7u@ds119081.mlab.com:19081/heroku_xz7n8dv2', // 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'APPLICATION_ID',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'  // Don't forget to change to https if needed
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || 'http://localhost:1337/parse',
      "appId": process.env.APP_ID || 'APPLICATION_ID',
      "masterKey": process.env.MASTER_KEY || 'MASTER_KEY',
      "appName": process.env.APP_NAME || "Asherah"
    }
  ],
  "users": [
    {
      "user":"asherah",
      "pass":"pass123"
    }
  ],
  "trustProxy": 1
}, true);


var app = express();

// Authentication configuration
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

var usersRoute = require('./routes/users');
var devicesRoute = require('./routes/devices');
var rolesRoute = require('./routes/roles');
var fbUtilsRoute = require('./routes/facebookutils');
app.use('/api/users', usersRoute);
app.use('/api/devices', devicesRoute);
app.use('/api/roles', rolesRoute);
app.use('/', fbUtilsRoute);

// Dashboard
app.use('/dashboard', dashboard); // make the Parse Dashboard available at /dashboard

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/userHasLoggedIn', function(req, res) { // Temporary 'default' callback if successfully logged in 
  res.json({ message : "User successfully logged in" });
});

/*
  Initialize Twitter OAuth
*/
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, cb) {
    console.log('Twitter id: ' + profile.id + ', ' + token)
    cb(null, profile.id);
  }
));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/callback/twitter', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/userHasLoggedIn');
   });

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('asherah running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

module.exports = app;

// require('dotenv').config();

// var express           = require('express');
// var Parse             = require('parse/node');
// var ParseServer       = require('parse-server').ParseServer;
// var ParseDashboard    = require('parse-dashboard');
// var path              = require('path');
// var bodyParser        = require('body-parser');
// var cookieParser      = require('cookie-parser');
// var methodOverride    = require('method-override');
// var errorHandler      = require('errorhandler');
// var passport          = require('passport');
// var FacebookStrategy  = require('passport-facebook').Strategy;
// var TwitterStrategy   = require('passport-twitter').Strategy
// var GoogleStrategy    = require('passport-google').Strategy
// var app               = express();

// var databaseUri = process.env.MONGODB_URI;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.set('views', __dirname + '/public');
// app.set('view engine', 'ejs'); // set up ejs for templating
// app.use(methodOverride());
// app.use(express.static(path.join(__dirname, '/public')));
// app.use(passport.initialize());
// app.use(passport.session());

// /*
//   Passport serializer/deserializer
// */
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// /*
//   Initialize Parse Server
// */
// var api = new ParseServer({
//   databaseURI: databaseUri,
//   cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
//   appId: process.env.APP_ID,
//   masterKey: process.env.MASTER_KEY,
//   serverURL: process.env.SERVER_URL,  
//   liveQuery: {
//     classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
//   }
// });

// app.use(process.env.PARSE_MOUNT, api);

// // Parse.initialize(process.env.APP_ID);
// // Parse.serverURL = process.env.SERVER_URL;

// /*
//   Initialize Facebook OAuth
// */
// passport.use(new FacebookStrategy({
//     clientID: process.env.FB_CLIENT_ID,
//     clientSecret: process.env.FB_CLIENT_SECRET,
//     callbackURL: process.env.FB_REDIRECT_URI, //process.env.FB_REDIRECT_URI,
//     enableProof: true
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log("Facebook id: " + profile.id + ", " + accessToken);
//     cb(null, profile.id);
//   }
// ));

// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/callback/facebook',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/UserHasLoggedIn');
//   });



// /*
//   Initialize Twitter OAuth
// */
// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: process.env.TWITTER_CALLBACK_URL
//   },
//   function(token, tokenSecret, profile, cb) {
//     console.log('Twitter id: ' + profile.id + ', ' + token)
//     cb(null, profile.id);
//   }
// ));

// app.get('/auth/twitter', passport.authenticate('twitter'));
// app.get('/auth/callback/twitter', 
//   passport.authenticate('twitter', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/UserHasLoggedIn');
//    });

// // -------------------------------
// app.get('/UserHasLoggedIn', function(req, res) { // Temporary 'default' callback if successfully logged in 
//   res.json({ message : "User successfully logged in" });
// });

// /*
//   Initialize Parse Dashboard
// */
// var dashboard = new ParseDashboard({
//   "apps": [
//     {
//       "serverURL": process.env.SERVER_URL,
//       "appId": process.env.APP_ID,
//       "masterKey": process.env.MASTER_KEY,
//       "appName": process.env.APP_NAME
//     }
//   ]
// });

// /*
//   Setup routes
// */
// var usersRoute = require('./routes/users');
// var devicesRoute = require('./routes/devices');
// var rolesRoute = require('./routes/roles');
// var fbUtilsRoute = require('./routes/facebookutils');
// app.use('/api/users', usersRoute);
// app.use('/api/devices', devicesRoute);
// app.use('/api/roles', rolesRoute);
// app.use('/api/fb', fbUtilsRoute);
// app.use('/dashboard', dashboard); // make the Parse Dashboard available at /dashboard
// app.use('/public', express.static(path.join(__dirname, '/public'))); // Serve static assets from the /public folder

// app.get('/', function(req, res) { // Parse Server plays nicely with the rest of your web routes
//   res.status(200).send('Hello world!');
// });

// // There will be a test page available on the /test path of your server url
// // Remove this before launching your app
// app.get('/test', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

// app.get('/login', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/login.html'));
// });

// var httpServer = require('http').createServer(app);
// ParseServer.createLiveQueryServer(httpServer); // This will enable the Live Query real-time server

// module.exports = app;