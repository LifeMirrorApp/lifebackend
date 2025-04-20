import Product from "../models/productModel.js"; // Replace with your actual model

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      size,
      formats,
      isbn,
      language,
      numberOfPages,
      discountPrice,
      price,
      quantityAvailable,
      productType,
      reviews = [],
    } = req.body;

    // const imageUrls = req.files.map((file) => file.location);

    const imageUrls = req.files["images"]
      ? req.files["images"].map((file) => file.location)
      : [];

    // let videoFileUrl = null;
    // if (productType === "video" && req.file) {
    //   // Assuming a single video file is being uploaded
    //   videoFileUrl = req.file.location;
    // }

    // let videoFileUrl = null;
    // if (productType === "video" && req.files["videoFile"]) {
    //   // Accessing the video file from req.files
    //   videoFileUrl = req.files["videoFile"][0].location;
    // }
    let supportingFileUrl = null;
    if (req.files["supportingFile"]) {
      supportingFileUrl = req.files["supportingFile"][0].location;
    }

    const newProduct = await Product.create({
      name,
      category,
      description,
      images: imageUrls,
      size,
      formats,
      isbn,
      language,
      numberOfPages,
      discountPrice,
      price,
      quantityAvailable,
      productType,
      supportingFile: supportingFileUrl,
      reviews, // If reviews are passed, use them; otherwise, use an empty array
      productDate: Date.now(),
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
