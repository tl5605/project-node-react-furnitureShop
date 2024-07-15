const Order = require("../models/Order")

const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate({
        path:'items',
        populate:{
            path:"furniture",
            select:"description price image "
        }
    })

    if (!orders?.length) {
        return res.json([])
    }
    res.json(orders)
}

const getOrdersByUser = async (req, res) => {
    const { user } = req.params
    if (!user) {
        return res.status(400).json({ message: 'user id is required' });
    }
    const order = await Order.find({ user }).populate({
        path:'items',
        populate:{
            path:"furniture",
            select:"description price image "
        }
    })
    if (!order?.length) {
        return res.json([])
    }
    res.json(order)
}

const createNewOrder = async (req, res) => {
    const { user, items, dateOrder, ordererName, email, phone, city, street, num, apartment, price } = req.body
    if (!user || !items || !dateOrder || !ordererName || !email || !phone || !price) {
        return res.status(400).json({ message: 'fields user, items, dateOrder, ordererName, email, phone and price are required' })
    }

    let address = null;
    if (city || street || num) {
        if (!city || !street || !num) {
            return res.status(400).json({ message: "fileds city, street and num are required for shipment" })
        }
        address = {
            city: city,
            street: street,
            num: num,
            apartment: apartment
        }
    }
    const newOrder = await Order.create({ user, items, dateOrder, ordererName, email, phone, address, price })
    if (newOrder) {
        return res.json(`new order created`)
    }
    res.status(400).json({ message: 'Failed to create new order' })
}

const updateStatus = async (req, res) => {
    const { _id } = req.params
    const { status } = req.body
    if (!_id || !status) {
        return res.status(400).json({ message: "fileds id and status are required" })
    }
    const updOrder = await Order.findById(_id)
    if (!updOrder) {
        res.status(400).json({ message: 'Order not found' })
    }

    updOrder.status = status

    const theUpdateOrder = await updOrder.save()
    res.json(theUpdateOrder)
}

const deleteOrder = async (req, res) => {
    const { _id } = req.params
    const delOrder = await Order.findById(_id)
    if (!delOrder) {
        return res.status(400).json({ message: 'Order not found' })
    }

    const del = await delOrder.deleteOne()
    res.json(del)
}


module.exports = { getAllOrders, getOrdersByUser, createNewOrder, updateStatus, deleteOrder }