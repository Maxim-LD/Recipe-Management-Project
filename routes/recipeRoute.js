const express = require("express")
const recipeController = require("../controllers/recipeController")
const {  validateToken } = require("../middlewares/validations")

const router = express.Router()


router.post("/add-recipe", validateToken, recipeController.addRecipe)
router.get("/all-recipes", recipeController.recipes)
router.put("/update-recipe/:id", validateToken, recipeController.updateRecipe)
router.delete("/delete-recipe/:id", validateToken, recipeController.deleteRecipe)
router.get("/recipes/category", validateToken, recipeController.searchByCategory)
router.get("/recipes/ingredients", validateToken, recipeController.searchByIngredients)


module.exports = router