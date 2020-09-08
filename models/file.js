const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSchema = new Schema({
    uploadDate: Date,
    filename: String,
    contentType: String
});

const file = mongoose.model('file', fileSchema, "upload.files");
module.exports = file;