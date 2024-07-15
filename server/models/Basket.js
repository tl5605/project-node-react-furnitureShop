const mongoose = require("mongoose")
const FurnitureForBasket = require("./FurnitureForBasket")

const BasketSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        items: {
            type: [FurnitureForBasket],
            default:[]
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Basket', BasketSchema)