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
    imgUrl: {
        type: String,
        reqired: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    },

}, {
    timestamps: true,
});

export default mongoose.model('Part', PartSchema);