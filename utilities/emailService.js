const nodemailer = require('nodemailer')
const Users = require('../models/userSchema')
require('dotenv').config()



const regEmail = async (email)=>{

    try {
        
        const findUser = await Users.findOne({ email })

        const name = `${findUser.firstName} ${findUser.lastName}`

        const mailTransport = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_KEY}`
            }
        })

        const sentObject = {

            from: process.env.EMAIL,
            to: email,
            subject: "USER REGISTRATION",
            html:`<div>
                        <h1>You have successfully registered to the Recipe Management Platform</h1>
                        <br>
                        <h2>Below are your details!</h2>
                        <br>
                        <h3>Name: ${name}</h3>
                        <h3>Email: ${email}</h3>
                        <h3>Username: ${findUser.userName}</h3>
                </div> `
        }

        const result = await mailTransport.sendMail(sentObject)

    } catch (error) {
        
        console.log(error)
    }

        console.log("Mail sent successfully!")
}

const logEmail = async (email)=>{

    try {

        const findUser = await Users.findOne({ email })

        const now = new Date()
        const formattedDate = now.toLocaleDateString()
        const formattedTime = now.toLocaleTimeString()

        const mailTransport = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_KEY}`
            }
        })

        const sentObject = {

            from: process.env.EMAIL,
            to: email,
            subject: "LOGIN SUCCESSFUL",
            html:`<div>
                        <h1>Welcome Back</h1>
                        <h2>Your account was logged with the following details;</h2>
                        <br>
                        <h3>Email: ${email}</h3>
                        <h3>Username: ${findUser.userName}
                        <h3>Date: ${formattedDate}
                        <h3>Time: ${formattedTime}

                        <h4>If you did not make this request, kindly contact support team to review & protect your account.</h4>
                </div> `
        }

        const result = await mailTransport.sendMail(sentObject)


    } catch (error) {
        
        console.log(error)
    }

    console.log("Mail sent successfully!")
}



module.exports = {
    
    regEmail,
    logEmail

}