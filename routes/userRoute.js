const express = require("express")
const userController = require("../controllers/userController")
const { validateRegistration, validateLogin } = require("../middlewares/validations")
const validateToken  = require("../middlewares/validateAuth")

const router = express.Router()


router.post("/register-user", validateRegistration, userController.registerUser)
router.post("/login", validateLogin, userController.login)
router.post("/auth-login", validateToken, userController.authLogin)
router.get("/users", userController.users)
// router.delete("/delete-user/:id", userController.deleteUser)


module.exports = router