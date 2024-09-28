//create favorite and rating
//read one favorite and rating
//read all favorite and rating
//update one favorite and rating
//delete on f and r


const User = require("../models/userSchema")
const Recipe = require("../models/recipeSchema")
const Rating = require("../models/ratingSchema")



const recipeRatingAndFavorite = async (req, res)=>{

    try {

        const { userId, recipeId, ratingValue, favorite } = req.body

        if (!userId || !recipeId) {
            return res.status(400).json({
                message: "userId and recipeId are required"
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const recipe = await Recipe.findById(recipeId)
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            })
        }

        const existingRating = await Rating.findOne({ userId, recipeId })
        if (existingRating) {
            return res.status(400).json({
                message: "You have already rated this recipe."
            })
        }

        const newRating = new Rating({

            userId,
            recipeId,
            favorite,
            ratingValue

        })

        await newRating.save()

            return res.status(200).json({

                message: "Rating added successfully!",
                recipe: newRating
            })
            
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getOneRatingAndFavorite = async (req, res)=>{

    try {
        const { id } = req.params

        const rating = await Rating.findById(id).populate({

             path: 'recipeId',
             select: 'title'

        }) 
        .exec()

        if (!rating) {
            return res.status(404).json({ message: "Rating not found!" })
        }

        return res.status(200).json({ 

            message: "Rating retrieved successfully!",
            rating

        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAllRatingAndFavorite = async (req, res)=>{

    try {
        const rating = await Rating.find().populate({

             path: 'recipeId',
             select: 'title'
        }) .exec()

        return res.status(200).json({

            message: "Ratings retrieved successfully!",
            count: rating.length,
            ratings: rating
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateFavoriteAndRating = async (req, res) => {
    try {

        const { id } = req.params

        const { ratingValue, favorite } = req.body

        const updatedRating = await Rating.findByIdAndUpdate(

            id,
            { 
                ratingValue, 
                favorite 
            },
            { new: true }
        )

        if (!updatedRating) {
            return res.status(404).json({ message: "Favorite not found!" })
        }

        return res.status(200).json({

            message: "Rating updated successfully!",
            favorite: updatedRating
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteFavoriteAndRating = async (req, res) => {

    try {
        const { id } = req.params

        const deletedFavorite = await Rating.findByIdAndDelete(id)

        if (!deletedFavorite) {

            return res.status(404).json({ message: "Favorite not found!" })
        }

        return res.status(200).json({ message: "Rating deleted successfully!" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    recipeRatingAndFavorite,
    getOneRatingAndFavorite,
    getAllRatingAndFavorite,
    updateFavoriteAndRating,
    deleteFavoriteAndRating
}