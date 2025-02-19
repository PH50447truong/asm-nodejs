import { Router } from "express";
import productRouter from "./productRouter";
import authRouter from "./authRouter";

const router = Router();

router.get("/", function (req, res) {
    res.send("Welcome");
})

router.use("/products", productRouter)
router.use("/", authRouter)

export default router;
//a