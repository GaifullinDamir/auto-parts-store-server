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
        type: String,
        required: true, 
        default: 0
    },
    img: {
        type: String,
        reqired: true
    },
    
}, {
    timestamps: true,
});

export default mongoose.model('Part', PartSchema);