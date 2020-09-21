const mongoose  = require("mongoose");

const user_model = mongoose.model("users")

const getUser = async (req,res)=>{
    try {
        //need to change "search" according to the query name
        const users = await user_model.find({userName:req.query.q});
        //exact matches only
        //fuzzy search to be implemented
        const user = users[0];

        if(!user){
            res.render('resultNotFound.ejs')
        }
        else {
            var result = [];
            var i = 0;
            while (users[i]) {
                result.push(users[i]);
                i++;
            }
            //return res.send(result[0].userName);
            res.render('searchResult.ejs', {result})
        }
    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};
module.exports = {
    getUser,
}