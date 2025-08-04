// const mongoose = require('mongoose');
import mongoose from "mongoose";

export const connetToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connection Success!!")
    } catch (error) {
        console.log("Database Connection Failed", error.message)
    }
}