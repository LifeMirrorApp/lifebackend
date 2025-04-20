import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const router = express.Router();

// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  signatureVersion: "v4",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "eduprosolution",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileKey = `product/${Date.now()}-${file.originalname}`;
      cb(null, fileKey);
    },
    expires: 60 * 60 * 24 * 7,
  }),
});

// router.post("/create-product", upload.array("images", 5), createProduct);
router.post(
  "/create-product",
  upload.fields([
    { name: "images", maxCount: 5 }, // Supports up to 5 images
    // { name: "videoFile", maxCount: 1 }, // Supports 1 video file (if it's a video product)
    { name: "supportingFile", maxCount: 1 },
  ]),
  createProduct
);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
