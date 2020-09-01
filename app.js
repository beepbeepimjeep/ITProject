const express = require('express')
const app = express();

require('./models')

const usertestRouter = require('./routes/usertestRouter')
app.get('/', (req, res) => {
    res.send('<H1>Library System</H1>')
});
app.use('/user',usertestRouter);


app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});

