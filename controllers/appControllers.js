import { postProduct, putProduct } from "../helper/productCRUD.js"
import { Product } from '../models/Product.js';

export const getController = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, message: "Products List", data: products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getProductByIDController = async (req, res) => {
    try {
        const id = req.params.id;
        const findProduct = await Product.findById(id)
        if (!findProduct) {
            res.status(404).json({ success: false, message: "Incorrect Product ID!" })
        }
        const findedproduct = {
            id: findProduct._id,
            title: findProduct.title,
            current_price: {
                value: findProduct.price,
                currency_code: findProduct.currency_code
            }
        }
        res.status(200).json({ success: true, message: "Products List", data: findedproduct })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const postController = async (req, res) => {
    try {
        const { title, description, category, images, price, currency_code } = req.body

        const newProduct = {
            title,
            description,
            category,
            images,
            price,
            currency_code: currency_code.toUpperCase(),
        }

        if (!newProduct) {
            res.status(400).json({ success: false, message: "Failed to add product!" })
        }

        await postProduct(newProduct)
        // await Product.create({})
        res.status(200).json({ success: true, message: "Product added successfully!", data: newProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const putController = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const findProduct = await Product.findById(id)

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found for the given ID!",
            });
        }

        const updatedProduct = {};

        if (body.price) {
            updatedProduct.price = body.price
        }
        if (body.currency_code) {
            updatedProduct.currency_code = body.currency_code
        }

        await Product.findByIdAndUpdate(id, updatedProduct)
        res.status(200).json({ success: true, message: "Product edited successfully!", data: updatedProduct })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteController = (req, res) => {

}