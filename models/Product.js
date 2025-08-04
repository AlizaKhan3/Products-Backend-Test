import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
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
    required: true,
    uppercase: true,
  },

  category: {
    required: true,
  }



}, {timestamps: true});

export const Product = mongoose.model('product', productSchema)