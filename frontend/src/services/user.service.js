import api from "./api";

const userService = {
    getWishlist: async () => {
        const response = await api.get("/users/wishlist");
        return response.data;
    },

    toggleWishlist: async (productId) => {
        const response = await api.post(`/users/wishlist/${productId}`);
        return response.data;
    },
};

export default userService;
