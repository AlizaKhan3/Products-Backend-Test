import express from "express"
import dotenv from "dotenv"
import { connetToMongoDB } from "./database/databaseConnection.js"
import appRoutes from "./routes/appRoutes.js"

dotenv.config()

const app = express()
app.use(express.json());

const PORT = process.env.PORT

connetToMongoDB();

app.use("/products", appRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})