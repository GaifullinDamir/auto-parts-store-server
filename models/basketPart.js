import mongoose, { model } from "mongoose";

const BasketPartSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true,
        default: ''
    },
    phoneNumber:{
        type: String,
        require: true,
        default: ''
    },
    address:{
        type: String,
        require: true,
        default: ''
    },
    phoneNumber:{
        type: String,
        require: true,
        default: ''
    },
    orderIsPaid:{
        type: Boolean,
        required: true,
        default: false
    },
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