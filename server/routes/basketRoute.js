const express = require("express")
const router = express.Router()
const basketController = require("../controllers/basketController")
const verifyJWT = require("../middleware/verifyJWT")
const managerJWT = require("../middleware/managerJWT")


router.get("/", basketController.getAllBaskets)
router.get("/:user", verifyJWT, basketController.getBasketsByUser)
router.post("/", verifyJWT, basketController.createNewBasket)
router.put("/:user", verifyJWT, basketController.AddFurnitureForBasket)
router.put("/:_id/furniture/:furniture", verifyJWT, basketController.UpdateQuantity)
router.delete("/:_id/furniture/:furniture", verifyJWT,basketController.DeleteFurnitureFromBasket)
router.delete("/:_id", verifyJWT, basketController.DeleteBasket)



module.exports = router