require('dotenv').config();

var express         = require('express');
var ParseServer     = require('parse-server').ParseServer;
var ParseDashboard  = require('parse-dashboard');
var path            = require('path');
var bodyParser      = require('body-parser');
var app             = express();

var databaseUri = process.env.DATABASE_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api = new ParseServer({
  databaseURI: databaseUri,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL,
      "appId": process.env.APP_ID,
      "masterKey": process.env.MASTER_KEY,
      "appName": process.env.APP_NAME
    }
  ]
});

// Setup routes
var usersRoute = require('./routes/users');
var devicesRoute = require('./routes/devices');
var rolesRoute = require('./routes/roles');
app.use('/api/users', usersRoute);
app.use('/api/devices', devicesRoute);
app.use('/api/roles', rolesRoute);
app.use('/dashboard', dashboard); // make the Parse Dashboard available at /dashboard
app.use('/public', express.static(path.join(__dirname, '/public'))); // Serve static assets from the /public folder

var mountPath = process.env.PARSE_MOUNT; // Serve the Parse API on the /parse URL prefix
app.use(mountPath, api);

app.get('/', function(req, res) { // Parse Server plays nicely with the rest of your web routes
  res.status(200).send('Hello world!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var httpServer = require('http').createServer(app);
ParseServer.createLiveQueryServer(httpServer); // This will enable the Live Query real-time server

module.exports = app;