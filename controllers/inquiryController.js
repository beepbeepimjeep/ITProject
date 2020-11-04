const nodemailer = require("nodemailer");
const keys = require('../config/keys');
const mongoose = require("mongoose");
const User = mongoose.model("users");

const getInquiry = async function (req,res) {


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: keys.emailAccount, // this should be YOUR GMAIL account
            pass: keys.emailPassword // this should be your password
        }
    });
    console.log(req.params.user_id + "line18")
    const current_user = await User.findById({_id: req.params.user_id});

    console.log(current_user + "line20")

    var textBody = `FROM: ${req.body.name} EMAIL: ${req.body.email} MESSAGE: ${req.body.message}`;
    var htmlBody = `<h2>Greetings from ${req.body.name}</h2><p>from: ${req.body.name} <a href="mailto:${req.body.email}">${req.body.email}</a></p><p>Message: ${req.body.message}</p>`;
    var mail = {
        from: "myeportfoliounimelb@gmail.com", // sender address
        to: current_user.email, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
        subject: "A Message From My E-Portfolio", // Subject line
        text: textBody,
        html: htmlBody
    };

    // send mail with defined transport object
    transporter.sendMail(mail, function (err) {
        if (err) {
            console.log(err);
            res.json({message: "message not sent: an error occured; check the server's console log"});
        } else {
            res.redirect("back");
        }
    });

}

module.exports = {
    getInquiry,
}