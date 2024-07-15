const Furniture = require("../models/Furniture")


const getAllFurniture = async (req, res) => {
    const furniture = await Furniture.find().lean()
    if (!furniture?.length) {
        return res.json([])
    }
    res.json(furniture)
}


const getFurnitureByCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        return res.status(400).json({ message: 'category is required' })
    }

    
    const furniture = await Furniture.find({ category: category }).lean()

    if (!furniture?.length) {
        return res.json([])
    }
    res.json(furniture)
}


const createNewFurniture = async (req, res) => {
    const { code, category, description, price, stock } = req.body

    if (!code || !category || !price) {
        return res.status(400).json({ message: 'fields code, category and price are required' })
    }

    const duplicate = await Furniture.findOne({ code: code }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate code" })
    }

    const newFurniture = await Furniture.create({ code, category, description, price, stock, image: req.file.path })
    if (newFurniture) {
        return res.json(`furniture ${newFurniture.code} created`)
    }
    res.status(400).json({ message: 'Failed to create new furniture' })
}


const updateFurniture = async (req, res) => {

    const { _id, description, price, stock } = req.body
    if (!_id || !price) {
        return res.status(400).json({ message: 'fields id and price are required' })
    }

    const updFurniture = await Furniture.findById(_id)
    if (!updFurniture) {
        res.status(400).json({ message: 'Furniture not found' })
    }

    updFurniture.description = description
    updFurniture.price = price
    updFurniture.stock = stock
    if (req.file){
        updFurniture.image = req.file.path
    }
        
    const theUpdateFurniture = await updFurniture.save()
    res.json(`${theUpdateFurniture.code} updated`)
}


const updateStock = async (req, res) => {
    const { _id } = req.params
    const { quantity } = req.body
    if (!_id || !quantity) {
        return res.status(400).json({ message: 'fields id and quantity are required' })
    }

    const updFurniture = await Furniture.findById(_id)
    if (!updFurniture) {
        res.status(400).json({ message: 'Furniture not found' })
    }

    updFurniture.stock -= quantity;

    const theUpdateFurniture = await updFurniture.save()
    res.json(`${theUpdateFurniture.code} updated`)
}



const deleteFurniture = async (req, res) => {
    const { _id } = req.params
    const delFurniture = await Furniture.findById(_id)
    if (!delFurniture) {
        return res.status(400).json({ message: 'Furniture not found' })
    }

    const del = await delFurniture.deleteOne()

    res.json(del)
}


module.exports = { getAllFurniture, getFurnitureByCategory, createNewFurniture, updateFurniture, updateStock, deleteFurniture }