import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  label: { type: String, required: true }, // 1kg, 2kg
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["ATTA", "MASALA", "HALDI", "SERVICE"],
      required: true,
    },
    description: String,
    image: {
        url: String,
        publicId: String,
      },

    variants: [variantSchema],

    gstPercent: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
