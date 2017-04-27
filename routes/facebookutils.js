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

router.route('/api/fb')
	.post(function(req, res) {
	    res.redirect('/UserHasLoggedIn');      
	});


module.exports = router;