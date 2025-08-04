import { v4 as uuidv4 } from 'uuid';
import { getProductByID, getProducts, postProduct, putProduct } from "../helper/productCRUD.js"
import { Product } from '../models/Product.js';

export const getController = async (req, res) => {
    const products = await getProducts()
    res.status(200).json({ success: true, message: "Products List", data: products })
}

export const getProductByIDController = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductByID(id);
        // const product = Product
        if (!id) {
            res.status(404).json({ success: false, message: "please enter ID!" })
        }

        if (!product) {
            res.status(404).json({ success: false, message: "Incorrect Product ID!" })
        }
        res.status(200).json({ success: true, message: "Products List", data: product })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const postController = async (req, res) => {
    try {
        const { title, description, category, images, price, currency_code } = req.body

        const newProduct = {
            id: uuidv4(),
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
        // const {price, currency_code} = req.body;
        const body = req.body;
        const updatedProduct = await putProduct(id, body)

        res.status(200).json({ success: true, message: "Product edited successfully!", data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteController = (req, res) => {

}