const Users = require('../models/userSchema')

const validateRegistration = async (req, res, next)=>{

    const { firstName, lastName, email, password} = req.body

    const errors = []

    if(!firstName || !lastName){
        errors.push("Please enter your firstName & lastName")
    }

    const validEmail = (email)=>{

        const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return checkEmail.test(String(email).toLowerCase())
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

    

module.exports = {
    validateRegistration
}