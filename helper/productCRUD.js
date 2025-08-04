import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '../database/products.json')

export const getProducts = async () => {
    const products = await fs.promises.readFile(filePath, "utf-8")
    // console.log(products)
    const parseProducts = JSON.parse(products);
    return parseProducts
}

export const getProductByID = async (id) => {
    try {
        const products = await getProducts();
        const findProduct = products.find((prod) => prod.id === id)

        const findedproduct = {
            id: findProduct.id,
            title: findProduct.title,
            current_price: {
                value: findProduct.price,
                currency_code: findProduct.currency_code
            }
        }

        return findedproduct;

    } catch (error) {
        console.log(error.message)
    }
}

export const postProduct = async (newProduct) => {
    const products = await getProducts();
    products.push(newProduct)
    const stringifyData = JSON.stringify(products)
    console.log(stringifyData)
    await fs.promises.writeFile(filePath, stringifyData, "utf-8")
}

export const putProduct = async (id, payload) => {
    // console.log("updating product ---->", id, payload);
    const products = await getProducts()
    const findProductIndex = products.findIndex((prod) => prod.id === id)

    if (findProductIndex === -1) {
        return false;
    }

    let updatedProduct = { ...products[findProductIndex], ...payload }
    products[findProductIndex] = updatedProduct;
    const stringifyData = JSON.stringify(products);

    await fs.promises.writeFile(filePath, stringifyData, 'utf-8')
    return true;
}

