# Asherah

Asherah is the Volare Data Lake
Asherah is built on top of the following:
1. [Parse Server](https://github.com/ParsePlatform/parse-server)
2. [ExpressJS](https://expressjs.com/en/starter/basic-routing.html)
3. [PassportJS](http://passportjs.org/docs/) to authenticate users locally, with Facebook, Twitter, and Google. 

## Instructions

### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Visit http://localhost:3000 and then that's it!

### Getting Started With Heroku + mLab Development

#### With the Heroku Button

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

#### Without It

* Clone the repo and change directory to it
* Log in with the [Heroku Toolbelt](https://toolbelt.heroku.com/) and create an app: `heroku create`
* Use the [mLab addon](https://elements.heroku.com/addons/mongolab): `heroku addons:create mongolab:sandbox --app YourAppName`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `heroku config:set PARSE_MOUNT=/1`
* Deploy it with: `git push heroku master`

## References
* [Parse Server Guide](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide)
* [Getting Started and Local Authentication](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local)
* [Facebook](http://scotch.io/tutorials/javascript/easy-node-authentication-facebook)
* [Twitter](http://scotch.io/tutorials/javascript/easy-node-authentication-twitter)
* [Google](http://scotch.io/tutorials/javascript/easy-node-authentication-google)
* [Linking All Accounts Together](http://scotch.io/tutorials/javascript/easy-node-authentication-linking-all-accounts-together)
