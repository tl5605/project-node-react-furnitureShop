const express = require("express")
const router = express.Router()
const furnitureController = require("../controllers/furnitureController")
const managerJWT = require("../middleware/managerJWT")
const verifyJWT = require("../middleware/verifyJWT")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + ".jpg")
    }
})

const upload = multer({ storage: storage })




router.get("/", furnitureController.getAllFurniture)
router.get("/:category", furnitureController.getFurnitureByCategory)
router.post("/", managerJWT,upload.single('image'), furnitureController.createNewFurniture)
router.put("/:_id", managerJWT,upload.single('image'), furnitureController.updateFurniture)
router.put("/:_id/stock", verifyJWT, furnitureController.updateStock)
router.delete("/:_id", managerJWT, furnitureController.deleteFurniture)


module.exports = router