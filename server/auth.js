const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const {User, OAuth} = require('APP/db')
const auth = require('express').Router()

app.baseUrl = 'gentle-sea-91716.herokuapp.com'
/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm run dev
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `/api/auth/login/facebook`,
  },
  passport
})

// Google needs the GOOGLE_CLIENT_SECRET AND GOOGLE_CLIENT_ID
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/google`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport
})

// Other passport configuration:
// Passport review in the Week 6 Concept Review:
// https://docs.google.com/document/d/1MHS7DzzXKZvR6MkL8VWdCxohFJHGgdms71XNLIET52Q/edit?usp=sharing
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        if (!user) debug('deserialize retrieved null user for id=%d', id)
        else debug('deserialize did ok user.id=%d', id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)
console.log(`${app.baseUrl}`, 'base!!!!!')

auth.get('/whoami', (req, res) => res.send(req.user))

// POST requests for local login:
// maybe add a fail redirect to a signup page?
auth.post('/login/local', (req, res, next) => {
const {email, password} = req.body;
   User.findOne({
      where: {email},
      attributes: {include: ['password_digest']}
    })
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          console.log('Error 1')
          res.status(404).send({error: 'error'})
        }
        else{
                  return user.authenticate(password).then(ok => {
          if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              //throw new Error('two')
              console.log('Error 2')
              res.status(404).send({error: 'error'})
            }
          else {
            debug('authenticate user(email: "%s") did ok: user.id=%d', email, user.id)
            req.logIn(user, function(err) {
              if (err) {
                console.log('Error 3')
                res.status(404).send({error: 'error'})}
              return res.redirect('/')
            })
            }
          })
        }
      })
      .catch(next)
})
auth.post('/login/local', () => passport.authenticate('local', {successRedirect: '/'}))

auth.post('/signup', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,

    }
  })
    .then((user) => {

      if (user !== null) {
        console.log('user Exists!!!!!')
        res.status(404).send({user:'error'})
      } else {
         User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
        )
          .then(user => {
            return req.logIn(user, (err) => {
              if (err) { return next(err) }
            })
          })
          .then(() => res.redirect('/'))
          .catch(next)
      }
    })
})

// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/login/:strategy', (req, res, next) => {
  console.log('in AUTH DOT GET', env.FACEBOOK_CLIENT_ID,  env.FACEBOOK_CLIENT_SECRET)
  console.log(`${app.baseUrl}`, 'base!!!!!')
  passport.authenticate(req.params.strategy,  {

    scope: 'email', // You may want to ask for additional OAuth scopes. These are
                    // provider specific, and let you access additional data (like
                    // their friends or email), or perform actions on their behalf.
    successRedirect: '/',
    // Specify other config here
  })(req, res, next)
  }
)

auth.post('/logout', (req, res) => {
  console.log("logout")
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth










  // // This is called with the results from from FB.getLoginStatus().
  // function statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   // The response object is returned with a status field that lets the
  //   // app know the current login status of the person.
  //   // Full docs on the response object can be found in the documentation
  //   // for FB.getLoginStatus().
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     testAPI();
  //   } else {
  //     // The person is not logged into your app or we are unable to tell.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into this app.';
  //   }
  // }

  // // This function is called when someone finishes with the Login
  // // Button.  See the onlogin handler attached to it in the sample
  // // code below.
  // function checkLoginState() {
  //   FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  //   });
  // }

  // window.fbAsyncInit = function() {
  // FB.init({
  //   appId      : '{your-app-id}',
  //   cookie     : true,  // enable cookies to allow the server to access
  //                       // the session
  //   xfbml      : true,  // parse social plugins on this page
  //   version    : 'v2.8' // use graph api version 2.8
  // });

  // // Now that we've initialized the JavaScript SDK, we call
  // // FB.getLoginStatus().  This function gets the state of the
  // // person visiting this page and can return one of three states to
  // // the callback you provide.  They can be:
  // //
  // // 1. Logged into your app ('connected')
  // // 2. Logged into Facebook, but not your app ('not_authorized')
  // // 3. Not logged into Facebook and can't tell if they are logged into
  // //    your app or not.
  // //
  // // These three cases are handled in the callback function.

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });

  // };

  // // Load the SDK asynchronously
  // (function(d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = "//connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));

  // // Here we run a very simple test of the Graph API after login is
  // // successful.  See statusChangeCallback() for when this call is made.
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }
