import mongoose, { model } from "mongoose";

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Type', TypeSchema);