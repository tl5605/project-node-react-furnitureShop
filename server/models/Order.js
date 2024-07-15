const mongoose = require("mongoose")
const Address = require("./Address")
const FurnitureForBasket = require("./FurnitureForBasket")

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: {
            type: [FurnitureForBasket],
            required: true
        },
        dateOrder: {
            type: Date,
            required: true
        },
        ordererName: {
            type: String,
            required: true
        },
        address: {
            type: Address
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["הוזמן", "בתהליך", "נשלח", "נמסר"],
            default: "הוזמן"
        },
        price: {
            type: Number,
            required: true
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Order', OrderSchema)