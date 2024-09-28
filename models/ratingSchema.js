const mongoose = require("mongoose")
const Users = require("./userSchema")
const Recipes = require("./recipeSchema")

const ratingSchema = new mongoose.Schema({

    userId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: Users,
       require: true
    },
    recipeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Recipes,
        required: true
    },
    ratingValue: {type: Number, require: true, min: 1, max: 10},
    favorite: {  type: Boolean, default: false }
}, { 
    timestamps: true 
})

const Rating = new mongoose.model("ratings", ratingSchema)

module.exports =  Rating 