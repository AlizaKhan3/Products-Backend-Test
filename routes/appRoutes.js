import { Router } from "express";
import { deleteController, getController, getProductByIDController, postController, putController } from "../controllers/appControllers.js";

const router = Router()

//Base URL = https://api.escuelajs.co/api/v1

router.get("/", getController)
router.post("/add", postController)
router.get("/:id", getProductByIDController)
router.put("/put/:id", putController)
router.get("/delete/:id", deleteController)

export default router;