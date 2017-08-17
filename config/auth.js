/ config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID': env.proc.FACEBOOK_CLIENT_ID, // '251840548555589', // your App ID
        'clientSecret': env.proc.FACEBOOK_CLIENT_SECRET, // 'fda9fd21cb4c4a8a435877239bb67b7b', // your App Secret
        'callbackURL': env.proc.FACEBOOK_CALLBACK_URL, // 'https://asherah-755.herokuapp.com/auth/callback/facebook', //'http://localhost:3000/auth/callback/facebook',//
        'profileURL': env.proc.FACEBOOK_PROFILE_URL //'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    },
    'twitterAuth' : {
        'consumerKey': env.proc.TWITTER_CONSUMER_KEY, // 'bD5I6bVTP8xMJhAFxq9AGxTng',
        'consumerSecret': env.proc.TWITTER_CONSUMER_SECRET, // 'pUUsM8I2T1mcVDTxMSwbTKwVGAtafT4wGcUYrIfUkES6Y8N8Gg',
        'callbackURL': env.proc.TWITTER_CALLBACK_URL // 'https://asherah-755.herokuapp.com/auth/callback/twitter'//'http://localhost:3000/auth/callback/twitter'//
    },
    'googleAuth' : {
        'clientID': env.proc.GOOGLE_CLIENT_ID, // '242371238686-ka8bfn7ov7i8abbqttdfkbfmjh97rorn.apps.googleusercontent.com',
        'clientSecret': env.proc.GOOGLE_CLIENT_SECRET, // 'ioguUm5wBd9owyElkEcKe1EL',
        'callbackURL': env.proc.CALLBACK_URL // 'https://asherah-755.herokuapp.com/auth/callback/google' //'http://localhost:3000/auth/callback/google'
    }
};
