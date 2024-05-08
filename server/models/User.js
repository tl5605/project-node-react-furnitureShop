const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unuiqe: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["manager", "customer"],
            default: "customer"
        },
        email: {
            type: String
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)