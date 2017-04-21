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
		// By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
		var roleACL = new Parse.ACL();
		roleACL.setPublicReadAccess(req.body.setPublicReadAccess);
		roleACL.setPublicWriteAccess(req.body.setPublicWriteAccess);
		var role = new Parse.Role(req.body.name, roleACL);
		role.save({
			"name": req.body.name
		}, {
		    success: function(r) {
		    res.json(r);
		  },
		    error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
	})
    .get(function(req, res) {
        var query = new Parse.Query('_Role');
		query.find({
		  success: function(role) {
		    res.json(role);
		  },
		  error: function(error) {
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    });

router.route('/:role_id')
	.get(function(req, res) { 
        var query = new Parse.Query('_Role');
		query.get(req.params.role_id, {
		  success: function(role) {
		    res.json(role);
		  },
		  error: function(object, error) {
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    })
    .put(function(req, res) {
    	var roleACL = new Parse.ACL();
		roleACL.setPublicReadAccess(req.body.setPublicReadAccess);
		roleACL.setPublicWriteAccess(req.body.setPublicWriteAccess);
		var role = new Parse.Role(req.body.name, roleACL);
		role.save({
			"objectId": req.body.role_id,
			"name": req.body.name
		}, {
		    success: function(r) {
		    res.json(r);
		  },
		    error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    });


module.exports = router;