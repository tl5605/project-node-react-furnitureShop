const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required:true
        },
        street: {
            type: String,
            required:true
        },
        num: {
            type: Number,
            required:true
        },
        apartment: {
            type: Number
        }
    }, {
    timestamps: true
}
)

module.exports = AddressSchema