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
		var device = new Parse.Object('Devices');
	    device.save({ 
		    "name": req.body.name, 
		    "mac": req.body.mac, 
		    "users": req.body.users  
		  }, {
		    success: function(device) {
		    res.json(device);
		  },
		    error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
	})
    .get(function(req, res) {
        var query = new Parse.Query('Devices');
		query.find({
		  success: function(device) {
		    res.json(device);
		  },
		  error: function(error) {
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    });

router.route('/:device_id')
	.get(function(req, res) { 
        var query = new Parse.Query('Devices');
		query.get(req.params.device_id, {
		  success: function(device) {
		    res.json(device);
		  },
		  error: function(object, error) {
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    })
    .put(function(req, res) {
    	var device = new Parse.Object('Devices');
	    device.save({ 
		    "name": req.body.name, 
		    "mac": req.body.mac, 
		    "users": req.body.users  
		  }, {
		    success: function(device) {
		    res.json(device);
		  },
		    error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		    res.json({ error: "Error: " + error.code + " " + error.message });
		  }
		});
    })
    .delete(function(req, res) {
    	console.log("Im here! >>>>>>>>>>>> " + req.params.device_id);

		var query = new Parse.Query("Devices");
		query.equalTo("objectId", req.params.device_id));

		query.find().then(function(results) {
		  // Create a trivial resolved promise as a base case.
		  var promise = Parse.Promise.as();
		  _.each(results, function(result) {
		    // For each item, extend the promise with a function to delete it.
		    promise = promise.then(function() {
		      // Return a promise that will be resolved when the delete is finished.
		      return result.destroy();
		    });
		  });
		  return promise;

		}).then(function() {
		  console.log('Deleted!');
	           res.success("delete success");    
		});
    });

module.exports = router;