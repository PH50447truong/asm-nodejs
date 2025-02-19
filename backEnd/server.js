import express from "express";
import { products } from "./datamock/products";
import cors from "cors";

import router from "./routes";
import mongoose from "mongoose";
const app = express();
app.use(cors());


app.use(express.json());

async function connectMongoDB(dbUrl) {
  try {
      await mongoose.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("✅ Connect to MongoDB successfully!!!");
  } catch (error) {
      console.error("❌ Connect failure:", error);
  }
}

// Gọi hàm kết nối
connectMongoDB("mongodb://localhost:27017/Assignment_Nodejs");

app.use("/", router)

// Kiểm tra môi trường trước khi lắng nghe cổng
const PORT = 3000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}

app.get("/", (req, res) => {
  res.json(products);
});

export const viteNodeApp = app;
