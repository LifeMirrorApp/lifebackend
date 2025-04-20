import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
    },
    images: [String], // Array of image URLs
    productType: {
      type: String,
      enum: ["book", "video", "audio", "course"], // Define allowed product types
    },
    // videoFile: {
    //   type: String, // URL of the video file (stored in AWS S3 or other cloud storage)
    // },
    supportingFile: { type: String }, // URL of the uploaded file

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
