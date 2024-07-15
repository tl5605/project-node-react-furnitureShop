const mongoose = require("mongoose")

const FurnitureForBasketSchema = new mongoose.Schema(
    {
        furniture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Furniture',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }, {
    timestamps: true
}
)

module.exports = FurnitureForBasketSchema