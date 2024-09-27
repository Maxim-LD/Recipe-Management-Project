const mongoose = require("mongoose")
const Users = require("./userSchema")

const recipeSchema = new mongoose.Schema({

     authorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Users,
        require: true
    },
    authorName: {type: String, require: true},
    title: {type: String, require: true},
    ingredients: {type: [String], require: true},
    instructions: {type: [String], require: true},
    category: {type: String, require: true},
    userPreferences: { type: [String] }
   
    
},{
    timestamps: true
})

const Recipes = new mongoose.model("recipes", recipeSchema)

module.exports = Recipes