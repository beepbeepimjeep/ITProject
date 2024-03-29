require('dotenv').config()
const mongoose = require("mongoose");
const Grid = require('gridfs-stream')
// Connect to MongoDB --- Replace this with your Connection String
CONNECTION_STRING = "mongodb+srv://zihengt:<password>@cluster0.htzok.mongodb.net/ITProject?retryWrites=true&w=majority";
MONGO_URL =
    CONNECTION_STRING.replace("<password>",process.env.MONGO_PASSWORD);
mongoose.connect(MONGO_URL || "mongodb://localhost/itproject", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "ITProject"
});
const db = mongoose.connection;
db.on("error", err => {
    console.error(err);
    process.exit(1);
});

let gfs
db.once("open", async () => {
    gfs = Grid(db.db,mongoose.mongo);
    gfs.collection('upload')
    console.log("Mongo connection started on " + db.host + ":" +
        db.port);
});


