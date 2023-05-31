import mongoose, { model } from "mongoose";

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Type', TypeSchema);