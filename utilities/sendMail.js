const nodemailer = require("nodemailer")
const Users = require('../models/userSchema')
require('dotenv').config()


const sendMail = async (email)=>{

    try {
        
        const findUser = await Users.findOne({ email })

        const name = `${findUser.firstName} ${findUser.lastName}`

        const mailTransport = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASS}`
            }
        })

        const sentObject = {
            from: process.env.EMAIL,
            to: email,
            subject: "USER REGISTRATION",
            html: `<div>
                <h1>You have successfully registered to the Recipe Management Platform</h1>
                <br>
                <h2>Below are your details!</h2>
                <br>
                <h3>Name: ${name}</h3>
                <h3>Email: ${email}</h3>
                <h3>Username: ${findUser.userName}</h3>
                </div>`
        }

            const result = await mailTransport.sendMail(sentObject)


    } catch (error) {
        
        console.log(error)
    }    

    console.log("Mail sent successfully!")
}

module.exports = sendMail