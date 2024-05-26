import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { jwt } from "jsonwebtoken"
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true
    },
    coverImage: {
        type: String, //cloudinary url
    },
    password: {
        type: String,
        required: [true, "please fill the password"],
        unique: true
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    refreshToken: {
        type: String,
    }

}, { timestamp: true })
userSchema.pre('save', async function (next)
{
    if (!this.isModified()) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})
userSchema.method.isPasswordCorrect = async function (password)
{
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function ()
{
   return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () { 
    return jwt.sign({
        _id: this._id,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)