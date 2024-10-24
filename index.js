 
const express = require('express')
const mongoose = require('mongoose')
const connectToDB = require('./db')
const dotenv = require('dotenv').config()
const userRoutes = require("./routes/userRoute")
const recipeRoutes = require("./routes/recipeRoute")
const ratingRoutes = require("./routes/ratingRoute")



const app = express() 

app.use(express.json())


const PORT = process.env.PORT || 8002

connectToDB()

app.use("/api", userRoutes)
app.use("/api", recipeRoutes)
app.use("/api", ratingRoutes)


app.listen(PORT, ()=>{
    console.log(`Connected via port ${PORT}`)
})

app.get("/", (req, res)=>{

    return res.status(200).json({message: "Welcome to Recipe Management Services!"})
})


app.use((req, res)=>{
    res.status(404).json({message: "This endpoint does not exist yet!"})
})
