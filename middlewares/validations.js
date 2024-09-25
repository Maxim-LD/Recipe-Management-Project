const Users = require('../models/userSchema')
const jwt = require("jsonwebtoken")



const validEmail = (email)=>{

        const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return checkEmail.test(String(email).toLowerCase())
    }

const validateRegistration = async (req, res, next)=>{

    const { firstName, lastName, email, password} = req.body

    const errors = []

    if(!firstName || !lastName){
        errors.push("Please enter your firstName & lastName")
    }

    if(!email){

        errors.push("Please add your email!")

    }
    if(!validEmail(email)){

        errors.push("incorrect email!")
    }

    if(password.length < 8){
        errors.push("Please enter a minimum of eight characters!")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

    next()
}

const validateLogin  = async (req, res, next)=>{

    const { email, password } = req.body

    const errors = []

    if(!email){
        errors.push("Enter your email!")
    } else if(!validEmail){
        errors.push("Incorrect email format!")
    }

    if(!password){
        errors.push("Enter your password!")
    }

    if(errors.length > 0){
        return res.status(400).json({
            message: errors
        })
    }
    next()
}

const validateToken = async (req, res, next)=>{

    try {

        const authToken = req.header("Authorization")

        if(!authToken){
            return res.status(401).json({
                message: "Access denied!"
            })
        }
        
        const splitToken = authToken.split(" ")

        const actualToken = splitToken[1]

        const decodeToken = jwt.verify(actualToken, process.env.ACCESS_TOKEN)

        if(!decodeToken){

            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        console.log({decodeToken})

        const checkDB = await Users.findOne({email: decodeToken.userExist.email})

        if(!checkDB){

            return res.status(404).json({
                message: "User not found1"
            })
        }

        req.user = checkDB

        next()

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = {
    validateRegistration,
    validateLogin,
    validEmail,
    validateToken
}