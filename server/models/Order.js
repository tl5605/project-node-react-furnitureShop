const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        code:{
            type:Number,
            required:true,
            unique:true,
            immutable:true
        },
        category: {
            type: String,
            enum: ["table", "chair", "armchair", "sofa"],
            required: true
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Order', OrderSchema)