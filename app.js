var express = require('express');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var passport = require('passport');
require('./models/userModel');
require('./services/passport');
var keys = require('./config/keys');
var port = process.env.PORT || 5000;
var apiController = require('./controllers/apiController');
var authController = require('./controllers/oauthRoutes');


var app = express();
mongoose.connect(`mongodb+srv://${keys.uname}:${keys.pwd}@cluster0-vjcg1.mongodb.net/test?retryWrites=true&w=majority`);

// the data base is an open web socket
app.use(cookieSession({
    keys: [keys.cookie_key],
    maxAge: 1000 * 60 * 60 * 1000
}))
app.use(passport.initialize());
app.use(passport.session());
authController(app);
apiController(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));


    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
    });
    /* npm run build in react transpiles all the perfect react code into the index.html 
        now we have access to it when we're in production mode aka HEROKU
    */
}


app.listen(port);

/*
Note to self: I had everything working well and 
setup but I had the order messed up. The pieces of the server were not in order 
and so I was not getting the result I wanted. It took hours to realize this...
*/