import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DB_NAME } from "../constants.js";
    dotenv.config({
        path: './env'
    })
const connectDB = async () =>
{
    try
    {
        mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("successful connnected with DB")
    } catch (error)
    {
        console.error("connection failed with DB", error)
        process.exit(1)
    }

}

export default connectDB;