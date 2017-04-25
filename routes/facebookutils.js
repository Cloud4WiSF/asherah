require('dotenv').config();

var bodyParser  = require('body-parser');
var express     = require('express');
var Parse 		= require('parse/node');
var router      = express.Router();

Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;
Parse.User.enableUnsafeCurrentUser();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
	.post(function(req, res) {
		var sessionToken = req.body.sessionToken;
	    Parse.User.become(sessionToken).then(function (user) {

	      console.log("fbutils -- become -- success");
	      // The current user is now set to user.
	      res.redirect('/UserHasLoggedIn');

	    }, function (error) {
	      // The token could not be validated.
	      console.log("fbutils -- become -- error = " + error);
	    });       
	});


module.exports = router;