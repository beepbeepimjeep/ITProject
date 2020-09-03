const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')


require('./models/User');
require('./services/passport');

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRouter')(app);


require('./models')

const usertestRouter = require('./routes/usertestRouter')
app.get('/', (req, res) => {
    res.send('<H1>Library System</H1>')
});
app.use('/user',usertestRouter);


app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});

