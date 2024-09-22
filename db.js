
const mongoose = require("mongoose")

const connectToDB = async ()=>{

   await mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Connected to Database")
    })
}


module.exports = connectToDB