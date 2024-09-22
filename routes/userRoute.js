const express = require("express")
const userController = require("../controllers/userController")
const { validateRegistration } = require("../middlewares/validations")

const router = express.Router()


router.post("/register-user", validateRegistration, userController.registerUser)


module.exports = router