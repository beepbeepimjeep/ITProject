const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=>{
            done(null, user);
        });
});


passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((existingUser)=>{
            if (existingUser) {
                //we already have a record with the given profile ID
                done(null, existingUser);
            }else{
                //we don't have the record, create one
                new User({ googleId: profile.id, userName: profile.displayName }).save()
                    .then(user => done(null, user));
            }

        })

    })
);


passport.use(new LinkedInStrategy({
        clientID: keys.linkedinClientID,
        clientSecret: keys.linkedinClientSecret,
        callbackURL: '/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ linkedinId: profile.id })
            .then((existingUser)=>{
                if (existingUser) {
                    //we already have a record with the given profile ID
                    done(null, existingUser);
                }else{
                    //we don't have the record, create one
                    new User({ linkedinId: profile.id, userName: profile.displayName }).save()
                        .then(user => done(null, user));
                }

            })

    })
);