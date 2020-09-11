var Stores = require("../models/stores");

// get all the stores in the database
const getStore = async(req,res,next) => {


    try {
        const name = req.query.search.toLowerCase();
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
        const stores = await Stores.find({storename: nameCapitalized});

        const store = stores[0];
      //check if there is any name matches the request, if no go to storenotfound page.
        if (!store) {
            const stores = await Stores.find();
            var list = [];
            var i = 0;
            while (stores[i]) {
                list.push(stores[i]);
                i++;
            }
            res.render('storenotfound.ejs', {list})
        } else {
            res.render('stores.ejs', {store})   //Show store data on the store page
        }
   //Catch error
    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
}

module.exports = {
    getStore
};


