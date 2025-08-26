import axiosInstance from "@/lib/axiosInstance";

// Add item to cart
export const addToCart = async (id: string) => {
  const res = await axiosInstance.post("/postCart", { id });
  return res.data;
};

export const addAiToCart = async (id: string) => {
  const res = await axiosInstance.post("/postCartAi", { id });
  return res.data;
};

// Get cart items
export const getCart = async () => {
  const res = await axiosInstance.get("/getCart");
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (itemId: string) => {
  const res = await axiosInstance.delete("/delCart", { data: { itemId } });
  return res.data;
};

// Update quantity of a cart item
export const updateCartQuantity = async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
  const res = await axiosInstance.patch("/putCart", { itemId, quantity });
  return res.data;
}; 

export const getRecommendations = async () => {
  const res = await axiosInstance.get('/getRecommendations')
  return res.data;
}