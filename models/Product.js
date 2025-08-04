import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  currency_code: {
    type: String,
    required: true,
    uppercase: true,
  },

  category: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const Product = mongoose.model('product', productSchema)