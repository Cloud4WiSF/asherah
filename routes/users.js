require('dotenv').config();

var bodyParser  = require('body-parser');
var express     = require('express');
var Parse 		= require('parse/node');
var router      = express.Router();

Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
	.post(function(req, res) {
	    var user = new Parse.User();
	    user.set("username", req.body.username);
	    user.set("password", req.body.password);
	    user.set("email", req.body.email);
	    user.set("phone", req.body.phone);
	    user.set("device", req.body.device);

	    user.signUp(null, {
	      success: function(user) {
	        res.json({ message: 'Create user ' + req.body.username });
	      },
	      error: function(user, error) {
	        res.json({ error: "Error: " + error.code + " " + error.message });
	      }
	    });
	})
    .get(function(req, res) {
        var query = new Parse.Query('User');
		query.find({
		  success: function(user) {
		    res.json(user);
		  },
		  error: function(error) {
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    });

module.exports = router;