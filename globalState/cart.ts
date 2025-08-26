import { create } from 'zustand'
import { CartItemPayload } from '@/lib/types/cartItem'

interface CartState {
  cartItems: (CartItemPayload & {isSeoBundle?:boolean,isyearly?:boolean})[];
  seoProducts:(CartItemPayload & {isSeoBundle?:boolean,isyearly?:boolean})[];
  updateSeoProducts:(item:(CartItemPayload & {isSeoBundle?:boolean,isyearly?:boolean})[]) => void;
  addToCart: (item: (CartItemPayload & {isSeoBundle?:boolean,isyearly?:boolean})) => void;
  updateCart: (item: (CartItemPayload & {isSeoBundle?:boolean,isyearly?:boolean})[]) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartBreakdown: () => { subtotal: number; bundleDiscount: number; tax: number };
  hasSeoDiscount: () => number;
}

const useCart = create<CartState>((set, get) => ({
  cartItems: [],
  seoProducts:[],
  updateSeoProducts: (items) => set((state) => ({
    seoProducts:items
  })),
  addToCart: (item) => set((state) => {
    const newCartItems = [
      ...state.cartItems,
      {
        ...item,
        quantity: String(Number(item.quantity) || 1),
        monthlyPrice: String(Number(item.monthlyPrice) || 0),
        yearlyPrice: String(Number(item.yearlyPrice) || 0),
        actualPrice: String(Number(item.actualPrice) || 0),
        actualYearlyPrice: String(Number(item.actualYearlyPrice) || 0),
        discount: String(Number(item.discount) || 0),
      },
    ];
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    return { cartItems: newCartItems };
  }),
  updateCart:(data) => set((state) => {
    return {cartItems:data}
  }),
  removeFromCart: (id) => set((state) => {
    const newCartItems = state.cartItems.filter(i => i.id !== id);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    return { cartItems: newCartItems };
  }),
  clearCart: () => set(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify([]));
    }
    return { cartItems: [] };
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const newCartItems = state.cartItems.map(i => i.id === id ? { ...i, quantity: String(quantity) } : i);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    return { cartItems: newCartItems };
  }),
  getCartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce((sum, item) => {
      const price = item.isSeoBundle ? Number(item.yearlyPrice) || 0 : Number(item.monthlyPrice) || 0;
      return sum + (Number(item.quantity) * price);
    }, 0);
  },
  getCartBreakdown: () => {
    const { cartItems,hasSeoDiscount } = get();
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.isyearly ? Number(item.yearlyPrice) || 0 : Number(item.monthlyPrice) || 0;
      return sum + (Number(item.quantity) * price);
    }, 0);
    const discount = hasSeoDiscount();
    let bundleDiscount = 0;
    if(discount == 10) {
      bundleDiscount = subtotal * 0.1;
      subtotal * 0.10;
    } else if (discount == 20) {
      bundleDiscount = subtotal * 0.2;
      subtotal * 0.20;
    }
    const tax = (subtotal - bundleDiscount) * 0.0825;
    return {
      subtotal,
      bundleDiscount,
      tax
    };
  },
  hasSeoDiscount: () => {
    const { cartItems, seoProducts } = get();
    let discount = 0;
    if(cartItems?.some(cartItem => seoProducts?.some(seo => seo.id === cartItem.id))) {
       discount = 10;
       if(cartItems?.some(cartItem => cartItem.isyearly == true)) {
          discount = 20;
       }
    }
    return discount;
  },
}))

export default useCart
