import mongoose, { model } from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Brand', BrandSchema);