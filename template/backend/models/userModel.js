import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        gender: { type: String, required: true },
        startDate: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);
export default User;