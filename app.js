const express = require('express')
const app = express();
app.get('/', (req, res) => {
    res.send('<H1>Library System</H1>')
});
app.listen(process.env.PORT||3000, () => {
    console.log('The library app is listening on port 3000!')
});