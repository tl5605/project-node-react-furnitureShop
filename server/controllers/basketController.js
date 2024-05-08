const Basket = require("../models/Basket")


const getAllBaskets = async (req, res) => {
    const basket = await Basket.find().lean()
    if (!basket?.length) {
        return res.json([])
    }
    res.json(basket)
}

const getBasketsByUser = async (req, res) => {
    const { user } = req.params
    if (!user) {
        return res.status(400).json({ message: 'user id is required' });
    }
    try {
        const basket = await Basket.findOne({ user }).populate({
            path: 'items',
            populate: {
                path: 'furniture',
                select: 'description category price stock image' // Specify the fields you want to select
            }
        });

        if (!basket || !basket.items.length) {
            return res.status(204).json(null);
        }

        // Now each item in basket.items will have description and price populated
        res.json(basket);
    } catch (error) {
        console.error("Error occurred while fetching basket:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createNewBasket = async (req, res) => {
    const { user, furniture, quantity } = req.body
    if (!user) {
        return res.status(400).json({ message: 'user id is required' })
    }

    const newFurniture = {
        furniture: furniture,
        quantity: quantity
    }

    const newBasket = await Basket.create({ user, items: [newFurniture] })
    if (newBasket) {
        return res.json(newBasket)
    }
    res.status(400).json({ message: 'Failed to create new basket' })
}


const AddFurnitureForBasket = async (req, res) => {
    const { user } = req.params
    const { furniture, quantity } = req.body
    console.log("f: " + furniture);
    console.log("q: " + quantity);

    if (!user || !furniture) {
        return res.status(400).json({ message: 'fileds are required' })
    }

    const newFurniture = {
        furniture: furniture,
        quantity: quantity
    }

    const updBasket = await Basket.findOne({ user: user })
    if (!updBasket) {
        const newBasket = await Basket.create({ user, items: [newFurniture] })
        if (newBasket) {
            return res.json(newBasket)
        }
        return res.status(400).json({ message: 'Failed to create new basket' })
    }

    const exsistFurniture = updBasket.items.find(f => f.furniture.toString() === furniture._id)

    if (exsistFurniture) {
        console.log("here1");//למה הוא נכנס לכאן????

        exsistFurniture.quantity += 1 // +=quantity - צריך לשנות ל 
        const updateFurniture = await updBasket.save()
        return res.json(updateFurniture)
    }

    updBasket.items = [...updBasket.items, newFurniture]
    const theUpdateBasket = await updBasket.save()
    res.json(theUpdateBasket)
}


const UpdateQuantity = async (req, res) => {

    const { quantity } = req.body
    const { _id, furniture } = req.params

    if (!_id || !furniture) {
        return res.status(400).json({ message: 'id and furniture are required' })
    }

    const updBasket = await Basket.findOne({ _id: _id })
    if (!updBasket) {
        res.status(400).json({ message: 'Basket not found' })
    }

    const furniture1 = updBasket.items?.find(f => f.furniture.toString() === furniture)
    if (!furniture1) {
        res.status(400).json({ message: 'furniture not found' })
    }
    furniture1.quantity = quantity;
    const updateBasket = await updBasket.save()

    res.json(`${updateBasket} added`)
}



const DeleteFurnitureFromBasket = async (req, res) => {

    const { _id, furniture } = req.params
    if (!_id || !furniture) {
        return res.status(400).json({ message: 'id and furniture are required' })
    }

    const updBasket = await Basket.findById(_id)
    if (!updBasket) {
        return res.status(400).json({ message: 'Basket not found' })
    }

    const furniture1 = updBasket.items?.find(f => f.furniture.toString() === furniture)
    if (!furniture1) {
        return res.status(400).json({ message: 'furniture not found' })
    }
    else {
        const furnitures = updBasket.items?.filter(f => f.furniture.toString() != furniture)

        updBasket.items = furnitures
        const updateBasket = await updBasket.save()
        return res.json(updateBasket)
    }

}


const DeleteBasket = async (req, res) => {
    const { _id } = req.params
    const delBasket = await Basket.findById(_id)

    if (!delBasket) {
        return res.status(400).json({ message: 'Basket not found' })
    }

    const del = await delBasket.deleteOne()

    res.json(del)
}


module.exports = { getAllBaskets, getBasketsByUser, createNewBasket, AddFurnitureForBasket, UpdateQuantity, DeleteFurnitureFromBasket, DeleteBasket }