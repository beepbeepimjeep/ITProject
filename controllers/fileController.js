const mongoose  = require("mongoose");

const file = mongoose.model("file")

const getAllFile = async (req,res)=>{
    try {
        const all_file = await file.find()
        if(all_file.length==0){
            return res.json({
                err: 'No File Exist'
            })
        }
        return res.json(all_file);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};
module.exports = {
    getAllFile,
}