const passport = require('passport');
const express = require('express');
const path = require('path');


module.exports = app => {
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/auth/google', passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );
    app.get('/auth/linkedin', passport.authenticate('linkedin',{
        scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),(req, res) => {
        var user = req.user;
        var user_id = user._id
        res.redirect(`/user-mainpage/${user_id}`);});



    app.get('/auth/linkedin/callback', passport.authenticate('linkedin'),(req, res) => {
        var user = req.user;
        var user_id = user._id
        res.redirect(`/user-mainpage/${user_id}`);});


    app.get('/api/logout',(req, res)=>{
        req.logout();
        res.send(req.user)
            .redirect('/visitor-mainpage');
    });

    app.get('/api/current_user', (req, res)=> {
        res.send(req.user);
    });
};


