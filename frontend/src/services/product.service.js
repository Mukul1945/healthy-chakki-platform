import api from "./api";

/**
 * Fetch all active products (public).
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data?.data ?? [];
};

/**
 * Create product (admin only). Requires auth token.
 * @param {FormData} formData - name, category, description, variants (JSON string), image (file)
 */
export const createProduct = async (formData) => {
  // Do NOT set Content-Type: let axios set multipart/form-data with boundary
  const res = await api.post("/admin/products", formData);
  return res.data?.data;
};

/**
 * Get all products for admin (active + inactive).
 */
export const getAdminProducts = async () => {
  const res = await api.get("/products/all");
  return res.data?.data ?? [];
};

/**
 * Update product (admin only). Partial update, e.g. { isActive, name, description, variants }.
 */
export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data?.data;
};

/**
 * Delete product (admin only).
 */
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
