const Users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const sendMail = require('../utilities/sendMail')




const registerUser = async (req, res)=>{

    try {

        const { firstName, lastName, userName, email, password, bio, favoriteCuisine } = req.body

        const pass = password
        const userExist = await Users.findOne({email})

        if(userExist){

            return res.status(400).json({
                message: "User already exist!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new Users({
            firstName, 
            lastName, 
            userName,
            password: hashedPassword,
            email,
            bio, 
            favoriteCuisine
        })

        await newUser.save()

        await sendMail(email)


        return res.status(200).json({
            message: "User account created successfully!",
            user: newUser

        })

    } catch (error) {

        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    registerUser
}