import Product from "./product.model.js";

// ADMIN: Create product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUBLIC: Get all active products with search, filters, sorting & pagination
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 9 } = req.query;
    const query = { isActive: true };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "ALL") {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query["variants.price"] = {};
      if (minPrice) query["variants.price"].$gte = Number(minPrice);
      if (maxPrice) query["variants.price"].$lte = Number(maxPrice);
    }

    // Sorting logic
    let sortQuery = "-createdAt"; // Default: Newest first
    if (sort === "price_asc") {
      sortQuery = "variants.0.price"; // Assuming the first variant is the primary price
    } else if (sort === "price_desc") {
      sortQuery = "-variants.0.price";
    } else if (sort === "oldest") {
      sortQuery = "createdAt";
    } else if (sort === "newest") {
      sortQuery = "-createdAt";
    }

    const skipIdx = (page - 1) * limit;

    const products = await Product.find(query)
      .select("-image.publicId -gstPercent -createdBy -updatedAt -__v")
      .sort(sortQuery)
      .limit(Number(limit))
      .skip(skipIdx);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: Get all products (active + inactive)
export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.json({
    success: true,
    data: products,
  });
};

// ADMIN: Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// PUBLIC: Get multiple products by IDs
export const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.json({ success: true, data: [] });
    }

    const idsArray = ids.split(",");
    const products = await Product.find({
      _id: { $in: idsArray },
      isActive: true,
    }).select("-image.publicId -gstPercent -createdBy -updatedAt -__v");

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
