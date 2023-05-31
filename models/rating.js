import mongoose, { model } from "mongoose";

const RatingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

export default mongoose.model('Rating', RatingSchema);