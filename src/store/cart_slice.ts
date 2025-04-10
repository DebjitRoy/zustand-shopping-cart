import { CartProduct, Product } from '@/types/product';
import { StateCreator } from 'zustand';

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incrementQty: (productId: string) => void;
  decrementQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

const initialState: CartState = {
  products: [],
  total: 0,
};
export type CartSlice = CartState & CartActions;

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (
  set,
  get
) => ({
  ...initialState,
  incrementQty: (productId) =>
    set((state) => {
      const prod = state.products.find((product) => product.id === productId);
      if (prod) {
        prod.qty = prod.qty + 1;
      }
    }),
  decrementQty: (prodId) =>
    set((state) => {
      const prod = state.products.find((product) => product.id === prodId);
      if (prod) {
        if (prod.qty === 1) {
          state.products = state.products.filter((prod) => prod.id !== prodId);
        } else {
          prod.qty = prod.qty - 1;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products = [...state.products, { ...product, qty: 1 }];
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter((prod) => prod.id !== productId);
    }),
  getProductById: (productId) => get().products.find((product) => product.id === productId),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => {
    set(() => initialState);
  },
});
