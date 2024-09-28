const Users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { regEmail, logEmail } = require("../utilities/emailService")





const registerUser = async (req, res)=>{

    try {

        const { firstName, lastName, userName, email, password, bio, favoriteCuisine } = req.body

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

        await regEmail(email)

        return res.status(200).json({
            message: "User account created successfully!",
            user: newUser

        })

    } catch (error) {

        return res.status(500).json({message: error.message})
    }
}

const login = async (req, res)=>{

    try {

        const { email, password } = req.body

        const userExist = await Users.findOne({email})

        if(!userExist){

            return res.status(404).json({
                message: "User not found!"
            })
        }

        const passwordCheck = await bcrypt.compare(password, userExist.password)

        if(!passwordCheck){
            
            return res.status(400).json({
                message: "Incorrect password or email!"
            })
        }
        
        const accessToken = jwt.sign(
            
            {userExist},
            `${process.env.ACCESS_TOKEN}`,
            {expiresIn: "5d"}
        )

        await logEmail(email)

        return res.status(200).json({
            message: "Login successful!",
            accessToken,
            userExist
        })
   
    } catch (error) {
        
    }
}

const authLogin = async (req, res)=>{

    return res.status(200).json({
        message: "Successful!",
        user: req.checkDB
    })
}

const users = async (req, res)=>{

    const users = await Users.find()

    return res.status(200).json({

        count: users.length,
        message: "Successul!", users
    })
}

/* const deleteUser = async (req, res)=>{

   try {
    
        const { id } = req.params

        await Users.findByIdAndDelete(id)
        
        return res.status(200).json({
            message: "user deleted successfully!"
        })
    } catch (error) {

        return res.status(500).json({message: error.message})
     } 

} */


module.exports = {
    registerUser,
    login,
    authLogin,
    users,
    // deleteUser
}