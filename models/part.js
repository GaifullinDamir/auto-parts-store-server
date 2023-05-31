import mongoose, { model } from "mongoose";

const PartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true, 
        default: 0
    },
    img: {
        type: String,
        reqired: true
    },
    type: {
        type: String,
        reqired: true
    },
    brand: {
        type: String,
        reqired: true
    },

}, {
    timestamps: true,
});

export default mongoose.model('Part', PartSchema);