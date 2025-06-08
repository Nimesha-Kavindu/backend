import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    img : {
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png'
    }
})

const User = mongoose.model('User', userSchema);

export default User;