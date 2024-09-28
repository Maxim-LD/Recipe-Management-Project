const express = require("express")
const ratingController = require("../controllers/ratingController")


const router = express.Router()


router.post("/add-rating", ratingController.recipeRatingAndFavorite)
router.get("/get-one-rating/:id", ratingController.getOneRatingAndFavorite)
router.get("/get-all-rating", ratingController.getAllRatingAndFavorite)
router.put("/update-rating/:id", ratingController.updateFavoriteAndRating)
router.delete("/delete-rating/:id", ratingController.deleteFavoriteAndRating)



module.exports = router