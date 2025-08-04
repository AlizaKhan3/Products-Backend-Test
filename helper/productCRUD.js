import { Product } from '../models/Product.js';

export const postProduct = async (newProduct) => {
    await Product.create(newProduct)    
}

export const putProduct = async (id, payload) => {
    // console.log("updating product ---->", id, payload);
    const products = await Product.find()
    // const findProductIndex = products.findIndex((prod) => prod.id === id)
    const findProductIndex = await Product.findOne({ _id: id, ...payload })

    if (findProductIndex === -1) {
        res.status(404).json({ success: false, message: "data not found against product id!" })
    }

    const updatedProduct = {};

    if (body.price) {
        updatedProduct.price = body.price
    }
    if (body.currency_code) {
        updatedProduct.currency_code = body.currency_code
    }

    await Product.findByIdAndUpdate({
        ...products[findProductIndex],
        ...payload
    })
    return true;
}

