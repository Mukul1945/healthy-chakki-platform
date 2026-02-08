import cloudinary from "../../config/cloudinary.js";
import Product from "../products/product.model.js";

const PLACEHOLDER_IMAGE = {
  url: "https://placehold.co/400x300/fef3c7/b45309?text=Product",
  publicId: null,
};

export const adminDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
    admin: req.user,
  });
};

async function uploadToCloudinary(buffer, mimetype) {
  const dataUri = `data:${mimetype || "image/jpeg"};base64,${buffer.toString("base64")}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUri,
      {
        folder: "healthy-chakki/products",
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
  });
}

export const addProduct = async (req, res) => {
  try {
    const { name, category, description, variants } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required",
      });
    }

    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid variants format. Use JSON array e.g. [{\"label\":\"1kg\",\"price\":60}]",
        });
      }
    }

    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one variant (label, price) is required",
      });
    }

    let image = PLACEHOLDER_IMAGE;
    if (req.file && req.file.buffer) {
      try {
        const uploaded = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        image = { url: uploaded.url, publicId: uploaded.publicId };
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
        // Continue with placeholder so product is still created
      }
    }

    const product = await Product.create({
      name,
      category,
      description: description || "",
      variants: parsedVariants,
      image,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create product",
    });
  }
};
