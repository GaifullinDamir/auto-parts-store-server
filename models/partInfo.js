import mongoose, { model } from "mongoose";

const PartInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part',
        required: true,
    },

}, {
    timestamps: true,
});

export default mongoose.model('PartInfo', PartInfoSchema);