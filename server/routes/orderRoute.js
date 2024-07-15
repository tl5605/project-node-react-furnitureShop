const express = require("express")
const router = express.Router()
const orderController = require("../controllers/OrderController")
const verifyJWT = require("../middleware/verifyJWT")
const managerJWT = require("../middleware/managerJWT")

router.get("/", managerJWT, orderController.getAllOrders)
router.get("/:user", verifyJWT, orderController.getOrdersByUser)
router.post("/", verifyJWT, orderController.createNewOrder)
router.put("/:_id", managerJWT, orderController.updateStatus)
router.delete("/:_id", managerJWT, orderController.deleteOrder)


module.exports = router