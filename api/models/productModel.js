import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
    },
    images: [String], // Array of image URLs
    productType: {
      type: String,
      enum: ["book", "video", "audio", "course"], // Define allowed product types
      required: true,
    },
    videoFile: {
      type: String, // URL of the video file (stored in AWS S3 or other cloud storage)
    },
    size: {
      type: String, // Optional e.g., "S", "M", "L", "XL"
    },
    formats: {
      type: String, // e.g., "Hardcover", "Softcover"
    },
    isbn: {
      type: String,
    },
    language: {
      type: String,
    },
    numberOfPages: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: Number,
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    productDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
