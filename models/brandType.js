import mongoose, { model } from "mongoose";

const BrandTypeSchema = new mongoose.Schema({
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

export default mongoose.model('BrandType', BrandTypeSchema);