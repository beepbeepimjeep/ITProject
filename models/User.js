const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    userName: String
});

const users = mongoose.model('users', userSchema, "users");
module.exports = users;


