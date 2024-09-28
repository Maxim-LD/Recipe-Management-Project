const Recipes = require("../models/recipeSchema")
const { pagination } = require("../utilities/pagination")



const addRecipe = async (req, res)=>{

    try {

        const authorId = req.user._id

        const authorName =  req.user.firstName + ' ' + req.user.lastName

        const { title, ingredients, instructions, category, userPreferences } = req.body

        if (!title || !ingredients || !instructions || !category) {

            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        const newRecipe = new Recipes({

            authorId,
            authorName,
            title,
            ingredients,
            instructions,
            category,
            userPreferences

        })

            await newRecipe.save()

            return res.status(200).json({

                message: "Recipe added successfully!",
                recipe: newRecipe
            })
   
    } catch (error) {


        return res.status(500).json({
            message: "An error occurred while adding the recipe.",
            error: error.message
        })
    }

}

const recipes = async (req, res)=>{

    const recipe = await Recipes.find()

    return res.status(200).json({

        count: recipe.length,
        message: "Successul!", recipe
    })
}

const updateRecipe = async (req, res)=>{
    
    try {
        
        const recipeId = req.params.id

        const { title, ingredients, instructions, category } = req.body

        const existingRecipe = await Recipes.findById(recipeId)

        if(!existingRecipe){

            return res.status(404).json({
                message: "Recipe not found!"
            })
        }

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            
            recipeId, 
            {
                title: title || existingRecipe.title,
                ingredients: ingredients || existingRecipe.ingredients,
                instructions: instructions || existingRecipe.instructions,
                category: category || existingRecipe.category

            },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            message: "Recipe updated successfully!",
            user: updatedRecipe
        })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the recipe",
            error: error.message})
    }
}

const deleteRecipe = async (req, res)=>{

    try {
        const { id } = req.params

        await Recipes.findByIdAndDelete(id)
        
        return res.status(200).json({
            message: "Recipe deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const searchRecipes = async (req, res)=>{

    try {

        //destructure the search parameters into the request query
        const { category, ingredients, userPreferences } = req.query

        const { page, limit, skip } = pagination(req)

        const search = {}

        if(category){

            search.category = category
        }
        
        if(ingredients){

            const ingredientsList = ingredients.split(",")

            search.ingredients = { $all: ingredientsList } 
    
        }

        if(userPreferences){

            const preferencesList = userPreferences.split(",")

            search.userPreferences = { $in: preferencesList }
        }

        const recipes = await Recipes.find(search)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: - 1 })
           
        const totalRecipes = await Recipes.countDocuments(search)

        if(recipes.length === 0){
            return res.status(404).json({
                message: "No recipe found!"
            })
        }

        return res.status(200).json({ 
            currentPage: page,
            totalRecipes,
            totalPages: Math.ceil(totalRecipes / limit),
            recipes 

        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}





module.exports = {  
        
        addRecipe,
        deleteRecipe,
        recipes,
        updateRecipe,
        searchRecipes
}