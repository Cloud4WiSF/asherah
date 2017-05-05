// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID': '251840548555589', // your App ID
        'clientSecret': 'fda9fd21cb4c4a8a435877239bb67b7b', // your App Secret
        'callbackURL': 'http://asherah-755.herokuapp.com/auth/callback/facebook', //'http://localhost:3000/auth/callback/facebook',//
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    },
    'twitterAuth' : {
        'consumerKey': 'bD5I6bVTP8xMJhAFxq9AGxTng',
        'consumerSecret': 'pUUsM8I2T1mcVDTxMSwbTKwVGAtafT4wGcUYrIfUkES6Y8N8Gg',
        'callbackURL': 'http://asherah-755.herokuapp.com/auth/twitter/callback'//'http://localhost:3000/auth/callback/twitter'//
    },
    'googleAuth' : {
        'clientID': '242371238686-ka8bfn7ov7i8abbqttdfkbfmjh97rorn.apps.googleusercontent.com',
        'clientSecret': 'ioguUm5wBd9owyElkEcKe1EL',
        'callbackURL': 'http://asherah-755.herokuapp.com/auth/twitter/google' //'http://localhost:3000/auth/callback/google'
    }
};
