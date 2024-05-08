const mongoose = require("mongoose")

const FurnitureSchema = new mongoose.Schema(
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
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required:true
        },
        stock: {
            type: Number,
            default:50
        },
        image:{ // אופציה של תמונת ברירת מחדל
            type:String
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Furniture', FurnitureSchema)