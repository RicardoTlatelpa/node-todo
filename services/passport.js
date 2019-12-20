const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');


const User = mongoose.model('users'); //fetching from mongoose; 1 argument

passport.serializeUser((user,done) =>{
    done(null, user.id)
})

passport.deserializeUser((id,done) =>{
    User.findById(id).then(user => {
        done(null,user)
    });
});
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true

}, function(accessToken, refreshToken, profile
    ,done){  
        
        User.findOne({googleID: profile.id}).then(existingUser =>{
            console.log('findingUser');    
            if(existingUser){
                
                done(null,existingUser)
                
            }
            else{
                 //create instance for mongoDB
                 
                new User ({
                    googleID: profile.id,
                    username: profile.displayName
                })
                .save()
                .then(user => done(null,user));
            }
        })
   

}))