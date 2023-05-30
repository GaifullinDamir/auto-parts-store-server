import mongoose, { model } from "mongoose";

const BasketPartSchema = new mongoose.Schema({
    basket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Basket',
        required: true,
    },
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('BasketPart', BasketPartSchema);