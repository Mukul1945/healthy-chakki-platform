"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  getAdminProducts,
  updateProduct,
  deleteProduct,
} from "@/services/product.service";

export default function AdminProductsPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role !== "ADMIN") router.replace("/admin");
  }, [user, router]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", variants: "" });

  const loadProducts = () => {
    setLoading(true);
    setError("");
    getAdminProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load products");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.role === "ADMIN") loadProducts();
  }, [user?.role]);

  const handleToggleActive = async (product) => {
    setUpdatingId(product._id);
    try {
      await updateProduct(product._id, { isActive: !product.isActive });
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setUpdatingId(id);
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Delete failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name || "",
      description: product.description || "",
      variants: JSON.stringify(product.variants || [], null, 2),
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    let variants = [];
    try {
      variants = JSON.parse(editForm.variants);
    } catch {
      setError("Invalid variants JSON");
      return;
    }
    setUpdatingId(editingId);
    try {
      await updateProduct(editingId, {
        name: editForm.name,
        description: editForm.description,
        variants,
      });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (user && user.role !== "ADMIN") return null;

  return (
    <div className="container-wide py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Manage Products</h1>
        <Link
          href="/admin"
          className="text-amber-700 font-medium hover:underline"
        >
          + Add new product
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="py-12 text-center text-stone-500">Loading products...</div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-12 text-center text-stone-600 rounded-xl bg-white border border-stone-200">
          No products yet. <Link href="/admin" className="text-amber-700 hover:underline">Add one</Link>.
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-sm"
            >
              <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0">
                {product.image?.url ? (
                  <img
                    src={product.image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-2xl">🌾</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                {editingId === product._id ? (
                  <div className="space-y-2">
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full max-w-xs px-2 py-1 border rounded text-sm"
                      placeholder="Name"
                    />
                    <input
                      value={editForm.description}
                      onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full max-w-xs px-2 py-1 border rounded text-sm"
                      placeholder="Description"
                    />
                    <textarea
                      value={editForm.variants}
                      onChange={(e) => setEditForm((f) => ({ ...f, variants: e.target.value }))}
                      rows={2}
                      className="w-full max-w-md px-2 py-1 border rounded text-sm font-mono"
                      placeholder="Variants JSON"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        disabled={!!updatingId}
                        className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 disabled:opacity-70"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 border rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-stone-900">{product.name}</p>
                    <p className="text-sm text-stone-500">{product.category}</p>
                    {product.description && (
                      <p className="text-sm text-stone-600 truncate max-w-md">{product.description}</p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {editingId !== product._id && (
                  <>
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        product.isActive ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {product.isActive ? "Available" : "Unavailable"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(product)}
                      disabled={!!updatingId}
                      className="text-sm text-amber-700 hover:underline disabled:opacity-50"
                    >
                      {updatingId === product._id ? "..." : product.isActive ? "Mark unavailable" : "Mark available"}
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="text-sm text-stone-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={!!updatingId}
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
