const mongoose  = require("mongoose");

const user_model = mongoose.model("users")

const getUser = async (req,res)=>{
    try {
        var noMatch = null;
        if(req.query.q){
            const regex = new RegExp(escapeRegex(req.query.q), 'gi');
            user_model.find({userName:regex}, function(err, allUsers){
                if(err){
                    console.log(err);
                }else{
                    if(allUsers.length < 1){
                        noMatch = "No users match that query, please try again."
                    }
                    res.render("searchResult.ejs", {users:allUsers, noMatch: noMatch});
                }
            });
        }

    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = {
    getUser,
}