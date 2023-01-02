const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendMail = async (user, order_id) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "order placed successfully",
        html: `<h4>Hi ${user.firstName}, </h4><p>your order has been placed successfully , with order id ${order_id}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            const error = new Error(
                "email not send due to technical issue please try after some time!!"
            );
            error.statusCode = 422;
            throw error;
            // console.log(error)
        } else {
            res.status(201).json({
                data,
                message: "mail successfully send!!",
            });
        }
    });
}