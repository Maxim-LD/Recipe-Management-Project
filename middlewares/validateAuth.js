const Users = require('../models/userSchema')
const jwt = require("jsonwebtoken")

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

module.exports = validateToken