const passport = require('passport');

module.exports = app => {
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
        res.render('user-mainpage', {
            user: user
        });
    });



    app.get('/auth/linkedin/callback', passport.authenticate('linkedin'),(req, res) => {
        res.redirect('/user-mainpage');});


    app.get('/api/logout',(req, res)=>{
        req.logout();
        res.send(req.user)
            .redirect('/visitor-mainpage');
    });

    app.get('/api/current_user', (req, res)=> {
        res.send(req.user);
    });
};


