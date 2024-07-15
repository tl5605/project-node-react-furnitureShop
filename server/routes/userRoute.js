const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")
const managerJWT = require("../middleware/managerJWT")

router.get("/", managerJWT, userController.getAllUsers)
router.post("/", managerJWT, userController.createNewUser)
router.put("/:_id", verifyJWT, userController.updateUser)
router.delete("/:_id", managerJWT, userController.deleteUser)


module.exports = router