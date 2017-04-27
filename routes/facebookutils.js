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

// router.route('/api/fb')
// 	.post(function(req, res) {
// 	    res.redirect('/userHasLoggedIn');      
// 	});

// router.get('/auth/fb', function(req, res, next) {
// 	Parse.FacebookUtils.init({ // this line replaces FB.init({
//         appId      : '251840548555589', // Facebook App ID
//         cookie     : true, // enable cookies to allow Parse to access the session
//         xfbml      : true
//      });

// 	Parse.FacebookUtils.logIn(null, {
// 		success: function(user) {
// 		  console.log("im here>> " + JSON.stringify(user));
// 		  console.log(">>User session token: " + user.attributes.sessionToken);
// 		  postFBLogin(user);
// 		},
// 		error: function(user, error) {
// 		  alert("User cancelled the Facebook login or did not fully authorize. Error =" + error.message);
// 		}
// 	});
// });

// router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// // route for showing the profile page
// router.get('/auth/callback/facebook', function(req, res, next) {

//     passport.authenticate('facebook', function (err, user, info) {
//                    if (err) { return next(err) }
//                    if (!user) {
//                         console.log('bad');
//                         req.session.messages = [info.message];
//                         return res.redirect('/home')
//                    }
//                    req.logIn(user, function (err) {
//                         console.log('good');
//                         if (err) { return next(err); }
//                         return res.redirect('/profile');
//                    });
//               })(req, res, next);        
// });

module.exports = router;