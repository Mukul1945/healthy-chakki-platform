import Order from "./order.model.js";
import Product from "../products/product.model.js";

// USER: Place order
export const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items required",
      });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USER: Get my orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");

  res.json({
    success: true,
    data: orders,
  });
};

// ADMIN: Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "phone")
    .sort("-createdAt");

  res.json({
    success: true,
    data: orders,
  });
};

// ADMIN: Update order status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: status },
    { new: true }
  );

  res.json({
    success: true,
    message: "Order status updated",
    data: order,
  });
};




export const validateCart = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: "Invalid product in cart",
        });
      }

      const variant = product.variants.find(
        (v) => v.label === item.variant && v.isActive
      );

      if (!variant) {
        return res.status(400).json({
          success: false,
          message: "Invalid product variant",
        });
      }

      const itemTotal = variant.price * item.quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        productId: product._id,
        name: product.name,
        variant: variant.label,
        price: variant.price,
        quantity: item.quantity,
      });
    }

    res.json({
      success: true,
      data: {
        items: validatedItems,
        totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
