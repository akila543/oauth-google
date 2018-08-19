const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js');
const passportSetup = require('./config/passport-setup.js');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

//initialize passportSetu
app.use(passport.initialize());
app.use(passport.session());

//connect to monogdb
mongoose.connect(keys.mongodb.dbURI,()=>{
  console.log('connected to mongodb');
});

//set up authRoutes

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
